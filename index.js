module.exports = function(parent, id) {
  return new Promise(function(resolve, reject) {
    const observer = new MutationObserver(function(mutations) {
      // Get an array of the added ids
      const addedIds = mutations.reduce(function(acc, mutationRecord) {
        const ids = Array
          .from(mutationRecord.addedNodes)
          .filter(function(node) { return node && node.attributes && node.attributes.getNamedItem('id') !== null; })
          .map(function(node) { return node.attributes.getNamedItem('id').value; });

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
