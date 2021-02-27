# Minecraft 客户端模组信息列表

## 简介

用于根据设定展示客户端中的模组信息（模组名称、模组版本、文件名等）。

## 使用方法

按格式修改 `js/data.js`

```javascript
// 模组类型名称
var modTypes = {
    模组类型: '模组类型名称',
    ...
};

// 模组列表
var modList = {
    模组类型: [
        // 模组
        {
            name: '',          // 模组名称 *
            version: '',       // 模组版本
            desc: '',          // 模组简介 *
            file: '',          // 文件名 *
            link: '',          // 模组链接 *
            isRequired: false, // 是否为必需模组
            dependants: []     // 依赖该模组的模组的名称列表
        }
    ],
    ...
};
```

示例

```javascript
var modTypes = {
    library: '前置模组',
    additional: '附加模组'
};

var modList = {
    library: [
        {
            name: 'Fabric API',
            version: '0.30.0',
            desc: 'Fabric API',
            file: 'L_Fabric_API_0.30.0.jar',
            link: 'https://www.curseforge.com/minecraft/mc-mods/fabric-api',
            isRequired: true,
            dependants: ['Mod Menu', 'Ok Zoomer']
        }
    ],
    additional: [
        {
            name: 'Mod Menu',
            version: '1.16.6',
            desc: '添加模组列表和设置页面',
            file: 'P_ModMenu_1.16.6.jar',
            link: 'https://www.curseforge.com/minecraft/mc-mods/modmenu'
        },
        {
            name: 'Not Enough Crashes',
            version: '3.1.5',
            desc: '游戏崩溃时不自动退出',
            file: 'P_NotEnoughCrashes_3.1.5.jar',
            link: 'https://www.curseforge.com/minecraft/mc-mods/not-enough-crashes/'
        }
    ]
};
```

## 鸣谢

- [ress.css](https://github.com/filipelinhares/ress)：Modern CSS reset
