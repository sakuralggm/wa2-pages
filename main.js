/**
 * 选择页面上的所有checkbox输入元素，并为它们添加记忆功能。
 * 这允许每个checkbox的状态在页面重新加载时被记住。
 */
var pathSuffix = window.location.pathname.match(/\/?[^\/]*$/)[0];
// 当文档加载完毕时执行
document.addEventListener('DOMContentLoaded', function () {
    // 检查每个checkbox元素，如果localStorage中有对应的值，则设置为选中状态
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function (checkbox, index) {
        var key = 'checkbox-' + pathSuffix + index; // 为localStorage的key设置一个唯一标识
        if (localStorage.getItem(key) === 'true') {
            checkbox.checked = true;
        }
    });
});

// 为每个checkbox添加事件监听器，当状态改变时保存到localStorage
var checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(function (checkbox, index) {
    var key = 'checkbox-' + pathSuffix + index; // 为localStorage的key设置一个唯一标识
    checkbox.addEventListener('change', function () {
        localStorage.setItem(key, checkbox.checked);
    });
});

/**
 * 当页面加载完成时，创建一个包含“回到顶部”和“回到原位置”按钮的固定位置的div元素，并将其添加到页面中
 * 以及两个函数，用于平滑滚动到页面顶部和之前记录的滚动位置
 */
window.onload = function () {
    var div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.bottom = '20px';
    div.style.right = '20px';
    div.style.display = 'flex';
    div.style.flexDirection = 'column';
    div.style.gap = '10px';
    div.style.zIndex = '1000'; // 确保按钮在移动端可见
    div.innerHTML = '<button onclick="scrollToTop()">↑</button>' +
        '<button onclick="scrollToOriginal()">↓</button>';
    document.body.appendChild(div);
};

// 记录页面原始滚动位置的变量
let originalPosition = 0;

// 定义回到顶部的函数，记录当前滚动位置并平滑滚动到页面顶部
function scrollToTop() {
    originalPosition = window.scrollY;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 定义回到原位置的函数，平滑滚动到之前记录的滚动位置
function scrollToOriginal() {
    window.scrollTo({ top: originalPosition, behavior: 'smooth' });
}

/**
 * 打开页面后，自动滚动到上次关闭时的位置
 */
// 在页面加载完毕时，自动滚动到上次记录的滚动位置
window.addEventListener('load', function () {
    var lastScrollPosition = localStorage.getItem('lastScrollPosition-' + pathSuffix);
    if (lastScrollPosition !== null) {
        window.scrollTo({ top: parseInt(lastScrollPosition, 10), behavior: 'smooth' });
    }
});

// 在页面卸载前，记录当前的滚动位置
window.addEventListener('beforeunload', function () {
    localStorage.setItem('lastScrollPosition-' + pathSuffix, window.scrollY);
});