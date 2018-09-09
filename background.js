 chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
       conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {urlContains: 'www.trulia.com/p/'}
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {urlContains: 'www.realtor.com/realestateandhomes-detail/'}
          }),
           new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {urlContains: 'www.zillow.com/homedetails/' }          
           })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
