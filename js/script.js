/**
 * 替换 src 中的 key 为 str（src 中的 key 需要以此格式写入：{{ key }}）
 * 
 * @param {string} src 被替换的内容
 * @param {string} key 被替换的 key
 * @param {string} str 替换后的文本
 * 
 * @returns {string} 替换后的内容
 */
function keyToString(src, key, str) {
    str = str || '';

    var reg = new RegExp(`{{ ${key} }}`, 'g');

    return src.replace(reg, str);
}

window.addEventListener('load', function () {

    // 模组类型列表项内容
    var typeItemElemHTML = '<div class="type-title">{{ title }}</div><div class="type-list"></div>';

    // 模组列表项内容
    var listItemElemHTML = '<div class="info-name"><span class="name">{{ name }}</span><span class="version">{{ version }}</span></div><div class="info-file">{{ file }}</div><div class="info-desc">{{ desc }}</div><div class="info-link">{{ link }}</div>';

    // 模组类型列表
    var modListElem = document.querySelector('.mod-list');

    for (let modType in modList) {

        // 空列表
        if (modList[modType].length == 0) {
            continue;
        }

        // 创建模组类型列表项
        var typeItemElem = document.createElement('div');

        typeItemElem.classList.add('type-item');

        // 设置内容
        typeItemElem.innerHTML = keyToString(typeItemElemHTML, 'title', modTypes[modType]);

        // 添加
        modListElem.appendChild(typeItemElem);

        modList[modType].forEach(function (item) {

            // 创建模组列表项
            var listItemElem = document.createElement('div');

            listItemElem.dataInfo = item;
            listItemElem.classList.add('list-item');

            // 是否为必需模组
            if (item.isRequired) {
                listItemElem.classList.add('required');
            }

            var html = listItemElemHTML;
            var replaceKeys = ['name', 'version', 'file', 'desc', 'link'];

            // 替换内容
            replaceKeys.forEach(function (key) {
                html = keyToString(html, key, item[key]);
            });

            // 设置内容
            listItemElem.innerHTML = html;

            // 添加
            typeItemElem.appendChild(listItemElem);

        });

    }

    // 模组名称（展示被依赖项）
    modListElem.addEventListener('click', function (e) {
        var target = e.target;

        if (!target.classList.contains('name')) {
            return;
        }

        // 点击的列表项
        var targetItem = target.parentElement.parentElement;

        var currentName = targetItem.dataInfo.name;
        var dependants = targetItem.dataInfo.dependants;

        // 无被依赖项
        if (!dependants) {
            return;
        }

        // 是否正在展示被依赖项
        if (targetItem.dataset.showingDepentants === '1') {

            // 取消展示

            var listItemElems = document.querySelectorAll('.list-item.hide');

            listItemElems.forEach(function (elem) {
                elem.classList.remove('hide');
            });

            targetItem.dataset.showingDepentants = '0';

        } else {

            // 展示

            var listItemElems = document.querySelectorAll('.list-item');

            listItemElems.forEach(function (elem) {
                // 非自身 & 非被依赖项
                var flag = (elem.dataInfo.name != currentName) && (dependants.indexOf(elem.dataInfo.name) == -1);

                if (flag) {
                    elem.classList.add('hide');
                }
            });

            targetItem.dataset.showingDepentants = '1';

        }
    });

    // 链接（打开）
    modListElem.addEventListener('click', function (e) {
        var target = e.target;

        if (target.classList.contains('info-link')) {
            window.open(target.textContent, '_blank');
        }
    });

});
