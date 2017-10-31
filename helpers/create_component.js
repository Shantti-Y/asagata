const displayContent = (path_name, callback) => {
   let contents = document.getElementsByClassName('content')
   let the_content = document.getElementById(path_name)
   for(let i = 0; i < contents.length; i++){ contents[i].style.display = 'none' }
   the_content.style.display = 'block'
   callback(the_content)
}

module.exports = { displayContent }
