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