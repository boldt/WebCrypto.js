// http://stackoverflow.com/a/4723302/605890
if (window.location.hostname !== "localhost" && window.location.protocol !== "https:") {
	window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);
}
