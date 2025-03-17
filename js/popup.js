document.getElementById("extract").addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab?.id) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: extractVideoLink
        });
    }
});

document.getElementById("download").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "download_video" });
});

// Function executed inside the active tab
function extractVideoLink() {
    const videoElement = document.getElementById("UIVideoPlayer");

    if (videoElement) {
        const videoLink = videoElement.getAttribute("data-mp4-link");

        if (videoLink) {
            const extractedPath = videoLink.split("etv")[1];
            const fullURL = "https://cdn1.einthusan.io/etv" + extractedPath;

            chrome.runtime.sendMessage({ action: "store_link", videoURL: fullURL });

            // Open the extracted video URL in a new tab
            window.open(fullURL, "_blank");
        } else {
            console.error("Video link not found!");
        }
    } else {
        console.error("UIVideoPlayer not found!");
    }
}
