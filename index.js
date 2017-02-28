module.exports = (parent, id) => {
  return new Promise((resolve, reject) => {
    const observer = new MutationObserver((mutations) => {
      // Get an array of the added ids
      const addedIds = mutations.reduce((acc, mutationRecord) => {
        const ids = Array
          .from(mutationRecord.addedNodes)
          .filter(node => node && node.attributes && node.attributes.getNamedItem('id') !== null)
          .map(node => node.attributes.getNamedItem('id').value);

        return acc.concat(ids);
      }, []);

      // If that contains the id we are looking for then invoke the function and remove the observer
      if (addedIds.indexOf(id) >= 0) {
        observer.disconnect();
        resolve();
      }
    });

    observer.observe(parent, {
      childList: true,
      subtree: true
    });
  });
}
