# 面向鸿蒙电脑的 IDE：字号、密度与组件尺度研究

研究整理与方案：钱佳丽 · 2026-10-19 · v2.0

## 1. 设计目标与结论

目标是**设计一款面向鸿蒙电脑的 IDE，键鼠为主，兼顾触屏**。研究问题是怎样安排导航、代码、设置、终端与 AI 阅读区的文字和控件尺度。竞品用于提供对照和取舍依据，IJ 组件库只用于搭建展示，不决定产品的最终参数。

建议作为第一轮真机验证起点：

| 对象 | 键鼠默认候选 | 阅读 / 触屏适配 | 推导理由 |
|---|---|---|---|
| 导航、菜单、表单文字 | 14 / 20 fp | 阅读16 / 22，触屏16 / 24 | IJ / VS提供13的参考，Zed普通标签为14；中文混排需要独立评估行框，14/20是任务取舍，不是市场均值。 |
| 代码 | 14 / 22 fp | 独立调节，可选16 / 24 | VS默认示例约12/18或14/19；Zed编辑器默认15且舒适行距约24.27。14/22作为代码密度与中文注释可读性的候选折中，未验证最优。 |
| AI长回复、解释说明 | 16 / 24 fp | 可调字号与内容宽度 | 服务连续阅读；不用导航标签字号承载大量正文。此项是本研究建议，未称作竞品统一默认。 |
| 辅助信息 | 12 / 16 fp | 放大字体时同比处理 | 仅用于时间、快捷键、次要状态；不能把错误原因、主要操作压到辅助级。 |
| 列表行高 | 28 vp | 阅读32；触屏48 | 默认20行框加上下各4；触屏实际增大行容器，禁止将48热区叠在28行上。 |
| 按钮、输入框 | 32 vp可见高；左右padding12 | 阅读36；触屏40可见、48目标，或直接48高控件 | 默认20行框加上下各6。可见边界和实际命中区域分开。 |
| 图标 | 常规16、重点20 vp；键鼠槽32 | 触屏槽48×48 vp | 图形服务识别，目标服务操作；不把图标本体强行放大到48。 |
| 圆角 | 常规控件R6；紧凑内嵌项R4 | 触屏控件R8；自定义浮层R12 | R6是本项目的候选造型，不是行业中位数或鸿蒙强制值。与R4/R8同尺寸比较；系统窗口使用系统边界。 |
| 间距 | 4 / 8 / 12 / 16 / 24 vp | 触屏同组操作12 | 4绑定图文，8同组操作，12表单内部，16面板内边距，24不同分组；按语义分层。 |

字体候选为 HarmonyOS Sans SC；代码区使用等宽字体并检查中文注释与符号回退。方案里的 fp / vp 是原生设计单位，网页 CSS px 仅用于默认比例示意，不能宣称与真机等大。

## 2. 比较口径

本轮覆盖 IntelliJ IDEA、VS Code、Zed、Cursor、TRAE、Xcode。不是市场份额排名。新增 Zed 是为了加入独立架构样本，避免仅拿 IJ 与 VS Code 两个体系推出普遍结论。

- 官方设计文档、Community Figma 组件、固定源码快照与安装版实测分别标注。
- 本轮未安装六款 IDE 逐一测量，不能把源码默认值标成当前稳定版实测。
- Cursor、TRAE、Xcode 未验证的控件尺寸继续待测，不用上游值补空，也不按“0”参与评分。
- 文字行高、行容器高度、可见控件高度、外层布局、点击热区是五个不同对象。
- px、pt、vp、fp保留来源单位。窗口缩放、系统字体倍率、渲染字体和设备倍率未校准时，不直接进行等大比较。

## 3. 主流 IDE 对照

| 产品 | UI 字号 | UI 行高 | 编辑器 | 行容器 | 控件 / 圆角 | 间距 |
|---|---|---|---|---|---|---|
| IntelliJ IDEA | 13（官方默认） | 16px（本库 UI） | 字号可配；1.2 行高因子 | 24px（本库表格） | 28px / R4（本库） | 按钮横12 / 纵6；组内12（所读弹窗） |
| VS Code | 13px（workbench 基础） | 18.2px（13 × 1.4） | macOS 12/18；Win/Linux 14/19 px | 22px（Explorer） | 26px¹ / R4（基础按钮） | 基础按钮横8 / 纵4 |
| Zed | 普通标签14；全局尺度设置16 | 标签按上下文；未统一量化 | 默认15；comfortable×1.618 ≈24.27 | 按调用组件；待测 | 18 / 22 / 28 / 32 高度档位；圆角待核 | 默认密度gap4；左右4或8 |
| Cursor | 待测 | 待测 | 编辑器 / 终端分别可配 | 待测 | 待测 | 待测 |
| TRAE | 待测 | 待测 | Editor 设置可调整 | 待测 | 待测 | 待测 |
| Xcode | 待测；macOS 参考 13pt | 待测 | Code / Prose / Console 分开配置 | 待测 | 待测 | 待测 |

### IntelliJ IDEA

官方字号文档、本次 Community 库及实际运行版本不是同一证据层。UI 默认 13 与库中 13/16 相符；编辑器参数不能套到菜单、表格。库的尺寸以设计逻辑单位记录，网页按 CSS px 实现。  来源：S01, S02, S03, S04。

### VS Code

取 2026-10-19 主线提交 f9444d6，而非某个已安装稳定版。18.2px 仅为 workbench 继承样式的计算值；具体控件有覆盖。¹26px=16+4×2+1×2，来自基础按钮样式，不代表所有按钮。编辑器取默认选项、EditorZoom=0。  来源：S05, S06, S07。

### Zed

以2026-10-17主线56934ec为依据。普通Label映射TextSize::Default=14；ui_font_size=16是全局尺度设置，不等于所有标签为16。按钮档位在默认rem尺度下解释；图标、字号和padding可由调用方覆盖。圆角未完成调用链核对，不猜测。  来源：S13, S14, S19。

### Cursor

官方文档可确认字体可配置，未给出可靠默认值。Agents Window 与 IDE 要分开采样。共享生态和相似外观不能证明其尺寸等于 VS Code。  来源：S08。

### TRAE

官方文档可确认主题、字体、window 等设置入口，未公布尺寸。需分别采集编辑区、导航区及 AI 对话区；导入 VS Code / Cursor 设置后不应再叫“出厂默认值”。  来源：S09。

### Xcode

13pt 来自 Apple 平台指南，不是 Xcode 实测。原生 pt、网页 CSS px、截图物理像素不直接混比；同一显示器与缩放条件下再采集。  来源：S10, S11。

### 比较中真正有用的结论

1. **全局字号不等于标签字号。** Zed的UI设置默认16，普通Label通过语义映射取14；不能把设置页一个数字抄成全界面字号。这也提醒新IDE建立分角色文字token。
2. **同一产品也需要多种控件高度。** Zed的紧凑/默认/中/大按钮档位为18/22/28/32（默认rem尺度）；IJ所读按钮28，VS基础样式算得26。它们支持“按任务设高度”，并不支持所有控件统一一个高度。
3. **原生平台不能被上游架构代替。** Cursor与TRAE的编辑器、AI区和独立窗口应分别测量；Xcode的macOS平台13pt参考不能直接视为导航器实测。
4. **间距比圆角更直接影响密度。** IJ按钮横12/纵6，VS基础按钮横8/纵4；Zed又按密度调节gap和padding。圆角可以形成视觉语言，但增大所有间距会直接减少同屏信息。
5. **Fleet只保留历史背景。** 2025-12-22停止下载，官方2026年5月说明演进为Air。不把旧截图用于当前尺寸结论。[S12]

## 4. 鸿蒙平台如何改变取舍

### 键鼠默认与触屏增强分开

华为电脑开发入门强调多窗口与多模态输入，应按业务和输入安排布局。[S15] IDE是高密度专业工作台，因此默认保留28列表行、32控件；不要因为设备带触摸屏，就让整个编辑器、终端和所有列表统一变成48行高。

同时，不能只说“兼顾触屏”而不提供实际可操作空间。华为既有V5跨端热区检查规则提出主要交互目标推荐48×48vp、不得小于40×40vp。本研究将其作为**触屏增强设计参考**，不是对当前PC所有键鼠控件的强制标准引用。[S16]

实施策略：

- 高频主操作在有空间处预留48目标，可保留32或40的可见按钮；外层必须响应点击并有正确语义，不能只是空白wrapper。
- 密集树与列表的目标无法在28行高内无重叠地扩到48；启用触屏增强时实际增加行高，或提供独立的大目标选择界面。
- 工具栏图标保持16/20图形，触屏目标增为48，必要时将低频操作收入更多菜单。
- 不仅依赖hover暴露功能；关键操作提供可点击入口、焦点和键盘通道。保留快捷键、方向键导航、右键上下文菜单的产品设计任务。
- 不因检测到触屏硬件就强制切换整页密度。提供明确、可记忆的模式设置，结合实际输入方式和窗口空间验证。

### 单位与字体缩放

vp随屏幕密度变化，fp还跟随系统字体设置。官方PC问题说明提醒避免混用绝对px与相对单位。[S17、S18] 本研究文字字号及行高建议以相应文本单位/token落地，布局以vp落地；具体API参数类型应按所用SDK核对。

表中28/32等布局数值只是在默认字体倍率下的起点。字体放大后，行容器至少容纳实际文字行框加上下留白；不能锁死28高再让文字增长。验证默认及用户大字设置、125%/150%等可用系统缩放档位、不同窗口宽度和显示器密度，记录实际设备支持的档位，不假定所有设备选项一致。

## 5. 完整 IDE 的分区建议

| 工作区 | 文本与尺度候选 | 设计任务 |
|---|---|---|
| 项目树 | 文件名16/20，行28，箭头槽20，图标槽20，图文4，每级缩进20；紧凑缩进16待验证 | 延续用户既有约束。优先保证同级对齐与长路径可辨认；缩进和热区独立处理。 |
| 主工具栏 / 编辑页签 | 常规UI14/20；操作控件32；工具栏约40–44、页签36 | 保持入口稳定，控制导航区域对编辑高度的占用；触屏扩大可操作项并重新排布。 |
| 代码编辑器 | 代码14/22，可独立放大；行号辅助层级 | 不跟着表单或AI区字体一起缩放；验证中文注释、等宽对齐、折叠与错误提示。 |
| 设置与搜索 | 标签14/20，控件32/R6；字段内部12、组间24 | 长标签和说明允许换行；字段与说明的可读性优先于强行等高。 |
| 终端与问题面板 | 终端14/20起点，可独立调整；问题列表28行 | 区分等宽日志和中文问题说明。不要将多行问题说明硬塞进单行28。 |
| AI助手 | 回复16/24，边距16；代码片段独立14/22 | 连续阅读与审阅修改需要不同层级。保留清晰的应用、撤回、查看差异入口。 |
| 自定义浮层 | R12候选、内边距16–24；遵循内容自适应 | 与密集控件区分表面层级。系统标题栏、外窗口圆角使用平台规则。 |

这些是视觉与密度方案范围，当前交付不是完整IDE工程，也未实现编辑、构建、调试、语言服务或真实模型接入。预览里的代码、终端、AI内容均为演示。

## 6. 候选方案与容量验证

| 方案 | UI字号/行高 | 列表行高 | 可见控件 | 目标高度 | R | 同组间距 | 336高列表整行数 |
|---|---|---|---|---|---|---|---|
| 键鼠默认 | 14/20 | 28 | 32 | 32；高频触控入口另留48 | 6 | 8 | 12 |
| 阅读增强 | 16/22 | 32 | 36 | 36 | 6 | 8 | 10，余16 |
| 触屏增强 | 16/24 | 48 | 40 | 48 | 8 | 12 | 7 |

字号/文字行高为fp，其他为vp，在默认倍率下讨论。网页几何按CSS逻辑像素模拟。公式为 `floor(336 / 行高)`，不含工具栏。整行数不是效率指标；同样内容下比较定位时间、误点、阅读理解与截断。

默认方案不强制覆盖文件树此前16字号约束；树形结构是独立语义组件。大字号方案也不一定伴随触屏模式，两者可以分别设置。

## 7. 页面实现与组件来源

网页主线改为「竞品对照 → 鸿蒙场景 → 推荐参数 → 完整IDE与设置预览」。IJ组件来源页保留原始参数作为追溯附录，不能再把它的13/16、28/R4直接称为鸿蒙标准。

完整IDE组合复用了仓库中可追溯至Int UI Kit主窗口7070:138481的结构与原SVG，设置页面复用Dialog/Button/Input/Checkbox结构。项目方案覆盖为HarmonyOS Sans SC、14/20、32/R6、R12浮层。属于基于IJ的代码实现与扩展，非官方鸿蒙组件包、原生应用截图或Figma真实实例。

`assets/harmony-ide.png`、`assets/settings-preview.png`、`assets/overview.png`从最终页面导出。`harmony-tokens.json`保留原生单位与设计依据；CSS导出仅供网页原型使用。组件、图标和字体原作者归属保留，研究与方案署名钱佳丽。

## 8. 验证计划与证据边界

第一轮先测鸿蒙电脑默认键鼠场景：同一中英文项目、长文件名、代码、AI回答，比较14/20与16/22。第二轮验证偶尔触屏任务，检查48目标是否互不覆盖，是否仍能顺利回到键鼠。第三轮在不同窗口与字体倍率下验证溢出、行高增长和布局连续性。

建议记录：目标定位时间、点击错误、文本截断、代码行定位、AI阅读理解及主观疲劳。尚未开展真机用户测试，不输出提升百分比或“最佳”结论。Cursor/TRAE/Xcode缺失尺寸仍是后续采样任务，不能宣称竞品数据已全部补齐。

## 9. 来源

- **S01 · 官方规范** — [JetBrains · Typography](https://plugins.jetbrains.com/docs/intellij/typography.html)。UI 使用 Inter；默认 13；H1 为默认 +5、H2 为默认 +3；提示为默认 −1。文档日期 2025-11-06。
- **S02 · Figma 组件** — [Int UI Kit · 按钮 / 输入框](https://www.figma.com/design/3q89XhaMGImDOPJwvfEpd7/Int-UI-Kit--Community-?node-id=146-52068)。Light / Active：文字 13/16；主按钮可见高 28、外层高 40、圆角 4。输入框 7399:46819 为 224 × 40，内容 224 × 28。
- **S03 · Figma 组件** — [Int UI Kit · 复选框 / 页签 / 表格 / 弹窗](https://www.figma.com/design/3q89XhaMGImDOPJwvfEpd7/Int-UI-Kit--Community-?node-id=7070-146270)。逐节点读取尺寸与截图；复选框 3590:81636、3590:81640；页签 5664:81616；表格 7278:46644；弹窗 7070:146270。
- **S04 · 官方设置** — [IntelliJ IDEA 2026.2 · Editor Font](https://www.jetbrains.com/help/idea/settings-editor-font.html)。编辑器字号用 points；默认行高因子为 1.2，可调整。文档日期 2026-08-17。未据此推算 UI 行高。
- **S05 · 固定源码** — [VS Code · workbench 基础样式](https://github.com/microsoft/vscode/blob/f9444d6d3ce7a745125e1d864b3fc6dfe02a9656/src/vs/workbench/browser/media/style.css#L48)。主线快照 f9444d6，2026-10-19。基础字号 13px、行高 1.4em；组件可覆盖。
- **S06 · 固定源码** — [VS Code · editor fontInfo](https://github.com/microsoft/vscode/blob/f9444d6d3ce7a745125e1d864b3fc6dfe02a9656/src/vs/editor/common/config/fontInfo.ts#L14)。默认字号 macOS 12 / Windows 与 Linux 14；默认 lineHeight=0 时按 macOS 1.5、其他平台 1.35 计算并四舍五入。EditorZoom=0 时分别为 18px、19px。
- **S07 · 固定源码** — [VS Code · Button / Input / Explorer](https://github.com/microsoft/vscode/blob/f9444d6d3ce7a745125e1d864b3fc6dfe02a9656/src/vs/base/browser/ui/button/button.css#L6)。基础文字按钮 12/16，padding 4px 8px，border 1px、radius 4px；单行总高据此算得 26px。explorerViewer.ts 中 ITEM_HEIGHT=22。Input 基类 radius=4，无统一固定高度。
- **S08 · 官方设置** — [Cursor · Themes and appearance](https://cursor.com/help/customization/themes)。编辑器与终端字号可分别调节；IDE 与 Agents Window 的入口有区别。该页未公布组件尺寸与默认字体数值。
- **S09 · 官方设置** — [TRAE · IDE 设置总览](https://docs.trae.cn/ide_ide-settings)。提供主题和 Editor 字体、word-wrap、window 等参数设置。该页未给出默认字号、行高、圆角。
- **S10 · 官方设置** — [Apple · Xcode workspace themes](https://developer.apple.com/documentation/xcode/customizing-your-workspace-using-themes)。Code / Prose / Console 字体可分别配置，并可覆盖个别文本类型；页面未给出统一默认字号。已读取官方 DocC JSON 正文。
- **S11 · 平台参考** — [Apple HIG · Typography](https://developer.apple.com/design/human-interface-guidelines/typography)。macOS 平台默认字号参考为 13pt；不是对 Xcode 导航器或控件的测量。已读取官方 DocC JSON 正文。
- **S12 · 历史状态** — [JetBrains · The Future of Fleet](https://blog.jetbrains.com/fleet/2025/12/the-future-of-fleet/)。Fleet 自 2025-12-22 起停止下载；文章 2026 年 5 月补充 Fleet 演进为 Air。本研究仅保留历史上下文。
- **S13 · 官方文档** — [Zed · 默认设置与编辑器行距](https://zed.dev/docs/reference/all-settings)。ui_font_size 默认16是全局尺度设置，buffer_font_size 默认15；不能据此把每个标签都写成16。源码普通标签的语义尺寸为14。
- **S14 · 固定源码** — [Zed · 语义字号 / 按钮 / 间距](https://github.com/zed-industries/zed/blob/56934ec0560bce8929025497411de7f5322fb6ca/crates/ui/src/components/button/button_like.rs#L455)。2026-10-17 主线56934ec：ButtonSize为18/22/28/32的紧凑至大型档位；默认尺度下普通标签14、小号12、大号16。默认密度下按钮内容gap4、默认左右padding4、中/大号padding8。具体调用方可覆盖。
- **S15 · 官方平台说明** — [HarmonyOS · 鸿蒙电脑设计与输入](https://developer.huawei.com/consumer/cn/multidevice/pc/get-started/)。电脑支持多窗口与多模态输入；应用需要按窗口、设备特征与业务安排布局。本文不提供统一的IDE字号数值。
- **S16 · 历史跨端规则** — [HarmonyOS · 点击热区检查规则（V5）](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-v5/ide_touch-target-size-V5)。V5跨端规则给出主要交互热区推荐48vp×48vp、不得小于40vp×40vp。作为触屏增强参考，不冒称当前鸿蒙PC所有键鼠控件都必须48高。官方搜索索引正文可读，直接页面请求超时。
- **S17 · 官方平台说明** — [HarmonyOS · 单位与PC文字适配](https://developer.huawei.com/consumer/cn/doc/doccenter-dev-faq/faqs-computer-4)。2026-07-15官方PC问题说明提醒不要混用px与fp/vp，并考虑窗口适配。通过官方搜索索引正文读取，直接页面请求超时。
- **S18 · 官方API参考（V2）** — [HarmonyOS · Pixel Units](https://developer.huawei.com/consumer/en/doc/harmonyos-references-V2/ts-pixel-units-0000001478341189-V2)。vp随屏幕密度转换，fp还受系统字体大小影响；CSS px、原生pt与vp/fp不直接等同。官方搜索索引正文可读，直接页面请求超时。
- **S19 · 官方文档** — [Zed · Appearance](https://zed.dev/docs/appearance)。编辑器comfortable行距因子1.618；standard为1.3。15×1.618约24.27为逻辑计算值，实际栅格化及取整另行确认。

Zed补充定位：[语义字号](https://github.com/zed-industries/zed/blob/56934ec0560bce8929025497411de7f5322fb6ca/crates/ui/src/styles/typography.rs#L132)、[Label映射](https://github.com/zed-industries/zed/blob/56934ec0560bce8929025497411de7f5322fb6ca/crates/ui/src/components/label/label_like.rs#L243)、[动态间距](https://github.com/zed-industries/zed/blob/56934ec0560bce8929025497411de7f5322fb6ca/crates/ui/src/styles/spacing.rs)。

**访问说明：** 部分华为动态文档直接请求超时，读取的是搜索服务返回的官方索引正文，来源中已注明。没有将未读取的鸿蒙电脑设计图中的尺寸编入结论；V5/V2参考保留版本标记。
