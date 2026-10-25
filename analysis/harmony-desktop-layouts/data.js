window.LAYOUT_RESEARCH = {
  patterns: [
    {id:'top',name:'顶部导航 + 内容',tag:'轻量导航',top:'shown',examples:'浏览器、媒体、轻量工具',use:'一级模块不超过约 5 个，且应用确实需要全局顶部导航。',risk:'功能增长后顶部容易拥挤；层级深时定位感不足。'},
    {id:'left',name:'左侧导航 + 内容',tag:'模块型应用',top:'hidden',examples:'设置、管理后台、知识工具',use:'模块较多、需要稳定位置或存在二级导航；应用顶部区按命令需要选择。',risk:'窄窗口占用主内容；需要折叠、覆盖或图标模式。'},
    {id:'list',name:'目录 + 列表 + 详情',tag:'选择链',top:'hidden',examples:'邮件、文件、联系人',use:'选择目录影响列表，选择列表影响详情；顶部命令可放在各列内部。',risk:'三个区域都有最小宽度，紧凑窗口必须逐级收起。'},
    {id:'three',name:'目录 + 内容 + 其他',tag:'三列工作区',top:'hidden',examples:'Xcode、IDE、文档工具',use:'目录用于定位，主内容用于完成任务，右侧展示属性、AI或上下文；顶部区独立判断。',risk:'辅助列不能和主内容争夺空间；必须支持隐藏和调整宽度。'},
    {id:'workbench',name:'IDE 工作台',tag:'多面板',top:'shown',examples:'VS Code、IntelliJ IDEA、DevEco',use:'文件、编辑器、调试、终端和AI需要并行；顶部命令区可随产品结构保留或精简。',risk:'区域数量最多；固定展示所有面板会迅速压垮编辑区。'},
    {id:'canvas',name:'画布 + 双侧面板',tag:'创作工具',top:'hidden',examples:'Figma、图片与视频编辑器',use:'画布是主对象；命令可采用浮动工具条或局部工具区，不必占满顶部。',risk:'画布应持续最大化；无选中对象时右侧应降噪或自动收起。'},
    {id:'dashboard',name:'顶部导航 + 卡片网格',tag:'概览型',top:'shown',examples:'数据看板、启动页、应用市场',use:'用户先扫描多组并列信息，再通过顶部导航进入单一模块。',risk:'卡片数量不能代替信息架构；窗口变化需要改列数而非缩小卡片。'},
    {id:'settings',name:'设置目录 + 单列内容',tag:'配置型',top:'hidden',examples:'系统设置、应用偏好',use:'左侧用于分类，右侧从上到下完成配置；通常不需要额外应用顶部区。',risk:'内容区过宽会降低扫描效率；相关设置需要成组。'}
  ],
  products: [
    {name:'VS Code',type:'IDE 工作台',structure:'Activity Bar、Primary / Secondary Side Bar、Editor、Panel、Status Bar；区域可隐藏和移动。',task:'代码编辑与多种工具视图并行。',lesson:'把右侧AI视为可切换辅助区；底部面板可移动，不绑定唯一方向。',source:'S04'},
    {name:'IntelliJ IDEA',type:'IDE 工作台',structure:'编辑器居中，Tool Windows 停靠在窗口四周，可重排、隐藏或分离。',task:'在不同开发任务间切换工具上下文。',lesson:'面板属于任务状态，不是永久布局；保存布局预设有价值。',source:'S05'},
    {name:'Xcode',type:'三列 + 底部区',structure:'顶部Toolbar、左侧Navigator、中间Editor、右侧Inspector、下方Debug Area。',task:'项目导航、编辑、属性检查和调试。',lesson:'三列适合IDE，但右侧和底部必须独立开关。',source:'S06'},
    {name:'Figma Design',type:'画布 + 双侧面板',structure:'Toolbar、Navigation Bar、左侧面板、可滚动画布和右侧属性面板。',task:'层级管理、画布创作与上下文属性编辑。',lesson:'选择对象后再强化右侧属性；画布需要一键最小化外围UI。',source:'S07'},
    {name:'Apple NavigationSplitView',type:'两列 / 三列选择链',structure:'前一列选择控制后一列内容；窄尺寸可折叠为单栈，并指定优先显示列。',task:'目录、内容列表和详情之间的连续导航。',lesson:'三列不是静态并排；需要明确折叠后哪一列留在最上层。',source:'S08'},
    {name:'Windows NavigationView',type:'顶部或左侧导航',structure:'根据宽度在展开左栏、图标栏、最小按钮间自适应，也支持顶部导航。',task:'应用级模块导航。',lesson:'导航形态由项目数量和窗口宽度共同决定。',source:'S09'}
  ],
  sources: [
    {id:'S01',title:'鸿蒙电脑应用开发入门',org:'华为开发者联盟',note:'确认全屏、分屏、自由多窗、悬浮窗以及响应式布局要求。',url:'https://developer.huawei.com/consumer/cn/multidevice/pc/get-started/'},
    {id:'S02',title:'HUAWEI MateBook Pro 规格参数',org:'华为消费者业务',note:'14.2英寸、3120×2080、3:2与十点触控；约算264ppi。',url:'https://consumer.huawei.com/cn/harmonyos-computer/matebook-pro/specs/'},
    {id:'S03',title:'HUAWEI MateBook Fold 规格参数',org:'华为消费者业务',note:'18英寸展开态3296×2472、4:3；13英寸半屏2472×1648、3:2；约算229ppi。',url:'https://consumer.huawei.com/cn/harmonyos-computer/matebook-fold-ultimate-design/specs/'},
    {id:'S04',title:'Visual Studio Code User Interface',org:'Microsoft',note:'官方描述六个工作区及主副侧栏、面板的显示和移动。',url:'https://code.visualstudio.com/docs/editing/getting-started/userinterface'},
    {id:'S05',title:'IntelliJ IDEA Tool Windows',org:'JetBrains',note:'官方描述工具窗停靠、隐藏、重排和分离。',url:'https://www.jetbrains.com/help/idea/tool-windows.html'},
    {id:'S06',title:'Configuring the Xcode project window',org:'Apple',note:'官方定义toolbar、navigator、editor、inspector和debug area。',url:'https://developer.apple.com/documentation/xcode/configuring-the-xcode-project-window'},
    {id:'S07',title:'Explore Figma Design files',org:'Figma',note:'官方定义导航栏、左右面板、画布和工具栏五个区域。',url:'https://help.figma.com/hc/en-us/articles/15297425105303-Explore-design-files'},
    {id:'S08',title:'NavigationSplitView',org:'Apple Developer',note:'两列或三列选择关系，以及窄尺寸折叠为单栈。',url:'https://developer.apple.com/documentation/swiftui/navigationsplitview'},
    {id:'S09',title:'NavigationView',org:'Microsoft Learn',note:'顶部 / 左侧导航及按窗口宽度切换显示模式。',url:'https://learn.microsoft.com/windows/apps/develop/ui/controls/navigationview'},
    {id:'S10',title:'HarmonyOS 设计资源',org:'华为开发者联盟',note:'提供手机、折叠屏、平板和电脑设计组件与模板。',url:'https://developer.huawei.com/consumer/cn/design/resource/'},
    {id:'S11',title:'Int UI Kit Community',org:'JetBrains Community',note:'本研究网页按钮、输入、页签和表格的展示组件来源。',url:'https://www.figma.com/design/3q89XhaMGImDOPJwvfEpd7/Int-UI-Kit--Community-'},
    {id:'S12',title:'HUAWEI MateBook 14',org:'华为消费者业务',note:'14.2英寸、2880×1920、3:2；约算244ppi。',url:'https://consumer.huawei.com/cn/harmonyos-computer/matebook-14-harmonyos-version/'}
  ],
  presets: [
    {id:'compact',name:'紧凑',width:1236,height:824},
    {id:'base',name:'主画板',width:1440,height:960},
    {id:'pro',name:'Pro',width:1560,height:1040},
    {id:'fold',name:'Fold展开',width:1648,height:1236},
    {id:'external',name:'外接屏',width:1920,height:1080}
  ]
};
