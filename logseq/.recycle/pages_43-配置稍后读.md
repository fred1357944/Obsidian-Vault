> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [kb.simpread.pro](https://kb.simpread.pro/#/page/%E9%85%8D%E7%BD%AE%E7%A8%8D%E5%90%8E%E8%AF%BB)

> 此功能属于 [[建立知识库]] 的一部分，如有需要请先了解知识库的概念。

此功能属于 [[

建立知识库

]] 的一部分，如有需要请先了解知识库的概念。  

配置
--

### 配置增强导出

> 下拉展开详细配置说明。  

### 配置自定义标题

设置为 `{{id}}{{un_title}}{{mode}}`，位置在：选项页 → 服务 → 定制导出，如下图所示

![](https://user-images.githubusercontent.com/81074/119208921-c4a75380-bad6-11eb-88eb-62c70d1109cc.png#crop=0&crop=0&crop=1&crop=1&id=tcfHP&originHeight=179&originWidth=874&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

关于自定义标题的更多说明 [请看这里](http://ksria.com/simpread/docs/#/%E5%AE%9A%E5%88%B6%E5%8C%96%E5%AF%BC%E5%87%BA?id=%e8%87%aa%e5%ae%9a%e4%b9%89%e5%af%bc%e5%87%ba%e6%a0%87%e9%a2%98)。  

### 配置稍后读

选项页 → 高级设定 → 稍后读（**必须要开启下面的选项**）

![](https://user-images.githubusercontent.com/81074/138629445-b05a3127-3d57-4075-adcc-35aab085bf95.png#crop=0&crop=0&crop=1&crop=1&id=rUEnn&originHeight=704&originWidth=1245&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

打开稍后读 → 左下角 → 打开选项页，并勾选下面的选项

![](https://user-images.githubusercontent.com/81074/119209007-1059fd00-bad7-11eb-9a8e-051ce8eca24d.png#crop=0&crop=0&crop=1&crop=1&id=pU5UL&originHeight=799&originWidth=1833&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

选项页 → 高级设定 → 标注

![](https://user-images.githubusercontent.com/81074/138630288-380a5526-fb14-41af-8dc4-0fe9d3c72092.png#crop=0&crop=0&crop=1&crop=1&id=ul3or&originHeight=677&originWidth=1278&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### 配置 [自动化](http://ksria.com/simpread/docs/#/%E8%87%AA%E5%8A%A8%E5%8C%96)

加入一个新的自动化方案，简单的说：就是**当保存到稍后读后，执行导出 HTML 的功能**，如下图所示

![](https://user-images.githubusercontent.com/81074/119209112-8eb69f00-bad7-11eb-92c0-16dd574325c2.png#crop=0&crop=0&crop=1&crop=1&id=T5Ldu&originHeight=693&originWidth=561&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

你可以在导出 HTML 时，也导出到你常见的服务，详见 [自动化](http://ksria.com/simpread/docs/#/%E8%87%AA%E5%8A%A8%E5%8C%96)  

### 配置结束

截至到现在为止，全部的配置已经结束，接下来是如何使用。

使用
--

需要先进入阅读模式后，使用 **快捷键 d d** 或 **右键 → 加入稍后读** 后会有类似这样的提示

![](https://user-images.githubusercontent.com/81074/119209674-7eec8a00-bada-11eb-9461-919ff9ef8fdb.gif#crop=0&crop=0&crop=1&crop=1&id=Or20n&originHeight=688&originWidth=1814&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

然后在 同步助手设置的 `output` 文件夹中会找到下面的文件

![](https://user-images.githubusercontent.com/81074/119209644-63817f00-bada-11eb-9c2e-eaa144f3b70f.png#crop=0&crop=0&crop=1&crop=1&id=OYKLr&originHeight=41&originWidth=743&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

下面这个操作全部的过程

![](https://user-images.githubusercontent.com/81074/119209787-4e592000-badb-11eb-8fb5-d84e6875720e.gif#crop=0&crop=0&crop=1&crop=1&id=HIRCw&originHeight=892&originWidth=1846&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

如何判断当前的稍后读是本地还是网络读取？
--------------------

看下图，有两个标识。

![](https://user-images.githubusercontent.com/81074/119209901-f7a01600-badb-11eb-860e-c0eb1cb8dfdc.png#crop=0&crop=0&crop=1&crop=1&id=k7rfx&originHeight=808&originWidth=1835&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

备注
--

上面的操作中我使用了 **HTML** 而非 **离线 HTML**（其实是一致的）

注意
--

这里有一个 Bug，影响不大，细节 [请看这里](https://github.com/Kenshin/simpread/discussions/3098)。

引申
--

上述操作只是 当加入稍后读后，产生本地环境，如果你想在产生标注时，也同样使用本地缓存的话，请看 [[

配置标注

]]。

参考知识点
-----

上述操作都已经写到了文档里面，有感兴趣的用户，可以看下：

简悦 · 同步助手的 [增强导出功能](http://ksria.com/simpread/docs/#/Sync?id=%e5%af%bc%e5%87%ba%e6%9c%8d%e5%8a%a1)

[自定义标题](http://ksria.com/simpread/docs/#/%E5%AE%9A%E5%88%B6%E5%8C%96%E5%AF%BC%E5%87%BA?id=%e8%87%aa%e5%ae%9a%e4%b9%89%e5%af%bc%e5%87%ba%e6%a0%87%e9%a2%98)

[自动化](http://ksria.com/simpread/docs/#/%E8%87%AA%E5%8A%A8%E5%8C%96)