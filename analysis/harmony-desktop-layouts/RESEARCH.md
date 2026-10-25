# 鸿蒙电脑原生应用布局研究

研究与方案设计：钱佳丽  
版本：1.3 · 2026-10-20

## 结论

设计鸿蒙电脑原生应用时，不应只选择一个物理屏幕分辨率，而应建立一个逻辑主画板和一组窗口变化规则。推荐以 **1440×960 px** 作为主设计稿；设计 px 按 1:1 映射布局 vp，文字映射 fp。至少同时验证 1236×824、1648×1236 和 1920×1080。

布局选择应拆成两个维度。先按信息关系确定内容区是一列、两列、三列还是可重排工作台，再独立判断是否需要应用顶部区。系统窗口标题与控制区不等于应用顶部栏；应用也可以把命令放进侧栏、内容区局部工具条或浮动工具条。三列布局的第三列应是上下文辅助区，窗口变窄时优先折叠，不能持续挤压主内容。

## 推荐画板

| 场景 | 逻辑尺寸 | 用途 |
|---|---:|---|
| 紧凑 | 1236×824 | Fold 半屏、高显示缩放、较小自由窗口 |
| 主画板 | 1440×960 | 日常页面设计与评审基准 |
| Pro | 1560×1040 | Pro 系列及更宽标准窗口 |
| Fold 展开 | 1648×1236 | 展开态的大屏增值布局 |
| 外接屏 | 1920×1080 | 外接显示器和横向扩展验证 |

这些是设计验证画板，不代表系统固定或默认缩放值。

## 鸿蒙电脑屏幕尺寸与分辨率

| 设备 / 姿态 | 官方屏幕参数 | 约算像素密度 | 2×候选逻辑尺寸 | 设计角色 |
|---|---|---:|---:|---|
| HUAWEI MateBook 14 | 14.2英寸、2880×1920、3:2 | 约244ppi | 1440×960 | 主设计画板 |
| HUAWEI MateBook Pro | 14.2英寸、3120×2080、3:2 | 约264ppi | 1560×1040 | 更宽标准窗口 |
| HUAWEI MateBook Fold 半屏 | 13英寸、2472×1648、3:2 | 约229ppi | 1236×824 | 紧凑压力测试 |
| HUAWEI MateBook Fold 展开 | 18英寸、3296×2472、4:3 | 约229ppi | 1648×1236 | 大画布与并行面板 |

像素密度由官方尺寸与分辨率约算。2×候选逻辑尺寸用于建立一致的设计映射，不表示 HarmonyOS 官方默认显示缩放。应用实际可用区域还会受系统区域、窗口装饰、分屏比例、自由窗口尺寸和用户显示设置影响。

从这组设备可以得出三点：3:2适合作为主基线；Fold展开的4:3应增加并行信息或纵向工具区，而不是等比放大页面；物理分辨率主要用于判断资源清晰度，布局仍应以逻辑vp和可变窗口组织。

## 推荐区域尺寸

| 区域 | 默认 | 建议范围 | 说明 |
|---|---:|---:|---|
| 应用顶部区 | 关闭（0） | 使用时 40–48 vp | 可选；仅承载确有必要的全局导航或命令 |
| 目录列 | 240 | 200–320 vp | 导航、项目树、页面或资源层级 |
| 主内容 | 自适应 | 不低于约640 vp | 始终获得剩余空间 |
| 辅助列 | 320 | 280–420 vp | 属性、详情、AI、上下文信息 |
| 底部区 | 200 | 160–280 vp | 日志、终端、时间线、输出 |
| 状态栏 | 24 | 按产品需要 | 状态与轻量反馈 |

以上为方案候选，不是鸿蒙官方统一尺寸。具体产品需要结合任务、内容长度、最小窗口与真实控件验证。

系统窗口框架由系统管理，不计入这里的应用顶部区。应用顶部区的存在与内容列数没有绑定关系：三列可以从窗口顶部直接开始，单列页面也可以因为全局导航而使用顶部区。

## 八类布局模式

1. **顶部栏 + 内容**：适合少量平级模块和内容优先工具。
2. **左侧导航 + 内容**：适合模块多、定位需要稳定的应用，顶部区按命令需要选择。
3. **目录 + 列表 + 详情**：适合邮件、联系人和文件管理等选择链。
4. **目录 + 内容 + 其他**：适合需要上下文属性或AI辅助的复杂应用，默认不要求顶部区。
5. **IDE 工作台**：中央编辑区周围停靠可重排工具窗。
6. **画布 + 双侧面板**：左侧管理层级，右侧编辑选中对象属性；工具可浮动或局部呈现。
7. **顶部栏 + 卡片网格**：适合概览、启动页和数据看板。
8. **设置目录 + 单列内容**：适合配置任务，内容区保持可读最大宽度。

## 市场结构依据

- VS Code 官方文档将界面划分为 Editor、Primary Side Bar、Secondary Side Bar、Activity Bar、Panel 和 Status Bar，并支持隐藏和移动区域。
- IntelliJ IDEA 官方文档说明 Tool Windows 默认停靠于主窗口侧边和底部，可以重排或分离。
- Xcode 官方文档定义顶部 Toolbar、Navigator、Editor、Inspector 和下方 Debug Area。
- Figma 官方帮助定义 Navigation Bar、左右面板、Canvas 和 Toolbar，并提供最小化外围UI的操作。
- Apple NavigationSplitView 明确两列或三列的选择关系，以及窄尺寸折叠为单栈。
- Windows NavigationView 支持顶部、展开左栏、图标左栏和最小模式，并按窗口宽度自适应。

这些资料确认的是区域结构和行为，不提供本研究列宽。页面里的列宽为鸿蒙方案建议。

## 响应式策略

| 逻辑宽度 | 建议状态 |
|---:|---|
| ≥1600 vp | 目录、主内容和辅助区完整并行 |
| 1280–1599 vp | 目录和主内容常驻，一个辅助区按需展示 |
| 960–1279 vp | 目录可压缩，辅助区改为抽屉或覆盖层 |
| <960 vp | 单区切换，保留当前主任务与返回路径 |

顺序应是：先折叠低频辅助信息，再压缩目录，最后改为单区切换。不要把字号、控件和内容等比缩小。

## 拉伸适配规则

整体窗口与内部面板需要分别定义拉伸行为：

- **整体窗口**：宽高连续变化，实验器验证范围为 800×600 至 2560×1600。窗口拉伸不是整张页面等比缩放。
- **左侧目录**：默认 240，常用范围 200–320；窗口增大时保持稳定，低于 960 时折叠。
- **中间主内容**：使用剩余空间并优先吸收窗口增量，建议保持至少 640。
- **右侧辅助**：默认 320，常用范围 280–420；低于 1280 时优先折叠，再次展开时恢复用户上次宽度。
- **底部区域**：使用时建议 160–280，并为上方主体保留至少 480。

用户拖动分隔线时应保存个人宽度；侧栏达到上限或主内容达到最小值后停止拖动。自动适配只改变区域的显示方式，不缩小字号、控件高度或点击目标。

## 设计交付

- Figma、Pixso 或 Sketch 中创建 1440×960 px 主画板。
- 布局、间距、圆角以 1px=1vp 标注；文字以 1px=1fp 标注。
- 矢量图标直接按逻辑尺寸交付；位图按照显示尺寸准备多倍率资源。
- 除静态页面外，标明各区域的最小、默认、最大宽度，以及显示、折叠、抽屉和覆盖状态。
- 验证全屏、分屏、自由窗口、Fold 展开与半屏、外接显示器，以及系统字体和显示大小变化。

## 来源

1. 华为开发者联盟：[鸿蒙电脑应用开发入门](https://developer.huawei.com/consumer/cn/multidevice/pc/get-started/)
2. 华为消费者业务：[MateBook Pro 规格](https://consumer.huawei.com/cn/harmonyos-computer/matebook-pro/specs/)
3. 华为消费者业务：[MateBook Fold 规格](https://consumer.huawei.com/cn/harmonyos-computer/matebook-fold-ultimate-design/specs/)
4. Microsoft：[Visual Studio Code User Interface](https://code.visualstudio.com/docs/editing/getting-started/userinterface)
5. JetBrains：[IntelliJ IDEA Tool Windows](https://www.jetbrains.com/help/idea/tool-windows.html)
6. Apple：[Configuring the Xcode project window](https://developer.apple.com/documentation/xcode/configuring-the-xcode-project-window)
7. Figma：[Explore Design files](https://help.figma.com/hc/en-us/articles/15297425105303-Explore-design-files)
8. Apple Developer：[NavigationSplitView](https://developer.apple.com/documentation/swiftui/navigationsplitview)
9. Microsoft Learn：[NavigationView](https://learn.microsoft.com/windows/apps/develop/ui/controls/navigationview)
10. Huawei：[HarmonyOS 设计资源](https://developer.huawei.com/consumer/cn/design/resource/)
11. JetBrains Community：[Int UI Kit Community](https://www.figma.com/design/3q89XhaMGImDOPJwvfEpd7/Int-UI-Kit--Community-)
12. 华为消费者业务：[HUAWEI MateBook 14](https://consumer.huawei.com/cn/harmonyos-computer/matebook-14-harmonyos-version/)

## 边界

本研究没有对各竞品安装版本进行像素测量，统一线框是结构示意。推荐断点、列宽和画板尺寸是结合当前鸿蒙电脑屏幕、复杂桌面软件任务及响应式原则提出的待验证方案，不能描述为行业平均值、鸿蒙官方规范或用户实验最优值。
