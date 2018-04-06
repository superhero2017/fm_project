const isMobile = () => {
  if (window.innerWidth < 768) {
    return true
  }
  return false
}

export { isMobile }
