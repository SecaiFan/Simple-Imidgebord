function showMore() {
    let arr = document.getElementsByClassName('post_hidden')
    for(let i = 0; i < arr.length; i++) {
        arr[i].setAttribute('style', 'display:block');
    }
}
