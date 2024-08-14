// utils.js
export function getRandomFraming() {
  const options = ["positive", "negative", "neutral"]
  return options[Math.floor(Math.random() * options.length)]
}

export function requestFullScreen() {
  const elem = document.documentElement
  if (elem.requestFullscreen) {
    elem.requestFullscreen()
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen()
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen()
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen()
  }
}
