chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "store_link") {
        chrome.storage.local.set({ link: message.videoURL }).then(() => {
            sendResponse({ status: "stored" });
        }).catch(err => console.error("Storage error:", err));
        return true; // Keeps the service worker alive
    }

    if (message.action === "download_video") {
        chrome.storage.local.get(["link"]).then(result => {
            if (result.link) {
                chrome.downloads.download({ url: result.link });
            } else {
                console.error("No link found in storage.");
            }
        }).catch(err => console.error("Download error:", err));
    }
});
