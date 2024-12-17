export async function fetch(url, options = {}, maxRetries = 10, baseDelay = 500) {

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const res = await globalThis.fetch(url, options);

      if (!res.ok) {
        // Handle HTTP error status codes
        if (attempt === maxRetries - 1) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        // Calculate exponential backoff delay with jitter
        const delay = baseDelay * (2 ** attempt) + Math.random() * 1000;

        await new Promise(resolve => setTimeout(resolve, delay));

        continue; // Skip to next iteration
      }

      return res;
    } catch (err) {
      console.error(`Attempt ${attempt + 1} failed:`, err);

      if (attempt === maxRetries - 1) {
        throw err; // Rethrow on final attempt
      }

      // Calculate exponential backoff delay with jitter
      const delay = baseDelay * (2 ** attempt) + Math.random() * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw new Error('Max retries exceeded');
}