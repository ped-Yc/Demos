<script setup>
import { ref, onMounted } from 'vue'

const commandHistory = ref([])
const currentCommand = ref('')
const showCursor = ref(true)
const terminalReady = ref(false)

const personalInfo = ref({
    name: '张三',
    title: '全栈开发工程师',
    email: 'zhangsan@example.com',
    location: '北京',
    summary: '具有5年Web开发经验的全栈工程师，专注于Vue.js和Node.js技术栈，热衷于创建高质量的用户体验。'
})

const skills = ref([
    {
        category: '前端开发',
        items: ['Vue.js', 'React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Webpack']
    },
    {
        category: '后端开发',
        items: ['Node.js', 'Express', 'MongoDB', 'MySQL', 'RESTful API']
    },
    {
        category: '开发工具',
        items: ['Git', 'VS Code', 'Docker', 'Jira', 'Postman']
    }
])

const projects = ref([
    {
        name: '企业管理系统',
        period: '2022.06 - 2023.03',
        description: '基于Vue3和Node.js的企业级管理系统，实现了用户管理、权限控制、数据分析等功能。',
        technologies: ['Vue3', 'Vite', 'Node.js', 'MongoDB', 'Element Plus'],
        highlights: [
            '独立设计并实现了基于RBAC的权限管理系统',
            '使用Vue3 Composition API优化了组件复用性',
            '实现了高性能的数据可视化模块'
        ]
    },
    {
        name: '电商平台',
        period: '2021.08 - 2022.05',
        description: '全栈电商应用，包含商品展示、购物车、订单管理、支付集成等功能。',
        technologies: ['React', 'Node.js', 'Express', 'MySQL'],
        highlights: [
            '设计并实现了微服务架构',
            '优化了页面加载性能，提升了50%的加载速度',
            '集成了多种支付方式和物流系统'
        ]
    }
])

const education = ref([
    {
        school: '北京大学',
        degree: '计算机科学与技术 学士',
        period: '2015 - 2019'
    }
])
// 模拟命令行输入和执行
function simulateCommand(cmd, delay = 100) {
    return new Promise(resolve => {
        const chars = cmd.split('')
        let i = 0
        currentCommand.value = ''

        const typeInterval = setInterval(() => {
            if (i < chars.length) {
                currentCommand.value += chars[i]
                i++
            } else {
                clearInterval(typeInterval)
                setTimeout(() => {
                    commandHistory.value.push({ command: cmd, output: getCommandOutput(cmd) })
                    currentCommand.value = ''
                    resolve()
                }, 300)
            }
        }, delay)
    })
}

// 根据命令返回对应的输出内容
function getCommandOutput(cmd) {
    if (cmd === 'whoami') {
        return { type: 'profile', data: personalInfo.value }
    } else if (cmd === 'ls skills') {
        return { type: 'skills', data: skills.value }
    } else if (cmd === 'ls projects') {
        return { type: 'projects', data: projects.value }
    } else if (cmd === 'cat education.txt') {
        return { type: 'education', data: education.value }
    } else if (cmd === 'help') {
        return {
            type: 'help',
            data: [
                { command: 'whoami', description: '显示个人信息' },
                { command: 'ls skills', description: '列出技能清单' },
                { command: 'ls projects', description: '列出项目经验' },
                { command: 'cat education.txt', description: '查看教育背景' },
                { command: 'clear', description: '清除屏幕' },
                { command: 'help', description: '显示帮助信息' }
            ]
        }
    } else if (cmd === 'clear') {
        commandHistory.value = []
        return null
    } else {
        return {
            type: 'error',
            data: `命令未找到: ${cmd}. 输入 'help' 获取可用命令列表.`
        }
    }
}

// 启动终端动画
onMounted(async () => {
    // 闪烁光标
    setInterval(() => {
        showCursor.value = !showCursor.value
    }, 500)

    // 模拟终端启动
    await new Promise(resolve => setTimeout(resolve, 1000))
    terminalReady.value = true

    // 自动执行初始命令
    await simulateCommand('whoami', 80)
    await new Promise(resolve => setTimeout(resolve, 800))
    await simulateCommand('ls skills', 80)
    await new Promise(resolve => setTimeout(resolve, 600))
    await simulateCommand('ls projects', 80)
    await new Promise(resolve => setTimeout(resolve, 600))
    await simulateCommand('cat education.txt', 80)
})
</script>

<template>

    <div
        class="terminal max-w-[800px] mx-auto p-8 font-mono bg-black text-green-400 shadow-xl rounded-lg overflow-hidden border border-green-800">
        <div class="terminal-header flex items-center mb-6 border-b border-green-600 pb-3">
            <div class="terminal-dots flex gap-2">
                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div class="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
        </div>
        <div class="ml-4 text-sm text-green-400 opacity-70 mb-4">resume.sh - bash</div>

        <!-- 终端启动动画 -->
        <div v-if="!terminalReady" class="terminal-boot">
            <div class="boot-text mb-1">正在启动终端...</div>
            <div class="progress-bar"></div>
        </div>

        <!-- 命令历史记录 -->
        <div v-else class="terminal-content">
            <!-- 当前命令输入行 -->
            <div class="command-line flex items-center mb-6 bg-green-900 bg-opacity-10 p-3 rounded-lg">
                <span class="text-green-500 mr-2 font-bold">visitor@resume:~$</span>
                <span class="command">{{ currentCommand }}</span>
                <span v-if="showCursor" class="cursor inline-block w-2 h-5 bg-green-400 ml-1"></span>
            </div>
            <div v-for="(item, index) in commandHistory" :key="index"
                class="mb-8 border-b border-green-900 pb-6 last:border-b-0">
                <div class="command-line flex items-center mb-4 bg-green-900 bg-opacity-10 p-3 rounded-lg">
                    <span class="text-green-500 mr-2 font-bold">visitor@resume:~$</span>
                    <span class="command">{{ item.command }}</span>
                </div>

                <!-- 命令输出 - 个人信息 -->
                <div v-if="item.output && item.output.type === 'profile'"
                    class="output mb-4 pl-4 border-l-2 border-green-800">
                    <div class="text-3xl font-bold text-green-400 mb-2">{{ item.output.data.name }}</div>
                    <div class="text-xl text-green-400 mb-3">{{ item.output.data.title }}</div>
                    <div class="flex gap-4 mb-3 text-sm">
                        <div><span class="text-green-600">EMAIL:</span> {{ item.output.data.email }}</div>
                        <div><span class="text-green-600">LOCATION:</span> {{ item.output.data.location }}</div>
                    </div>
                    <div class="text-green-400 leading-relaxed">{{ item.output.data.summary }}</div>
                </div>

                <!-- 命令输出 - 技能列表 -->
                <div v-if="item.output && item.output.type === 'skills'" class="output pl-4">
                    <div v-for="(skillGroup, sgIndex) in item.output.data" :key="sgIndex" class="mb-4">
                        <div class="text-green-500 mb-2">
                            <span class="text-green-600">drwxr-xr-x</span> {{ skillGroup.category }}/
                        </div>
                        <div class="flex flex-wrap gap-2 pl-4">
                            <span v-for="(skill, skillIndex) in skillGroup.items" :key="skillIndex"
                                class="bg-green-900 bg-opacity-30 px-3 py-1 rounded-sm text-sm text-green-400">
                                {{ skill }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- 命令输出 - 项目列表 -->
                <div v-if="item.output && item.output.type === 'projects'" class="output pl-4">
                    <div v-for="(project, pIndex) in item.output.data" :key="pIndex"
                        class="mb-6 p-4 bg-green-900 bg-opacity-10 rounded-sm border-l-2 border-green-700">
                        <div class="flex justify-between items-center mb-2">
                            <div class="text-green-400 font-bold">{{ project.name }}</div>
                            <div class="text-green-500 text-sm">{{ project.period }}</div>
                        </div>
                        <div class="my-2 text-green-400">{{ project.description }}</div>
                        <div class="flex flex-wrap gap-2 my-2">
                            <span v-for="(tech, techIndex) in project.technologies" :key="techIndex"
                                class="bg-green-900 bg-opacity-30 px-2 py-1 rounded-sm text-xs text-green-400">
                                {{ tech }}
                            </span>
                        </div>
                        <ul class="my-3 pl-4">
                            <li v-for="(highlight, hIndex) in project.highlights" :key="hIndex"
                                class="mb-1 text-green-400 list-disc">
                                {{ highlight }}
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- 命令输出 - 教育背景 -->
                <div v-if="item.output && item.output.type === 'education'" class="output pl-4">
                    <div v-for="(edu, eduIndex) in item.output.data" :key="eduIndex"
                        class="mb-4 p-3 bg-green-900 bg-opacity-10 rounded-sm">
                        <div class="text-green-400 font-bold">{{ edu.school }}</div>
                        <div class="text-green-500">{{ edu.degree }}</div>
                        <div class="text-green-500 text-sm">{{ edu.period }}</div>
                    </div>
                </div>

                <!-- 命令输出 - 帮助信息 -->
                <div v-if="item.output && item.output.type === 'help'" class="output pl-4">
                    <div class="mb-2 text-green-500">可用命令:</div>
                    <div v-for="(cmd, cmdIndex) in item.output.data" :key="cmdIndex" class="mb-1 flex">
                        <span class="text-green-600 w-32">{{ cmd.command }}</span>
                        <span class="text-green-400">{{ cmd.description }}</span>
                    </div>
                </div>

                <!-- 命令输出 - 错误信息 -->
                <div v-if="item.output && item.output.type === 'error'"
                    class="output p-4 bg-red-900 bg-opacity-10 rounded-lg border border-red-700 text-red-400">
                    {{ item.output.data }}
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
.terminal {
    position: relative;
    animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.terminal::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(0deg,
            rgba(0, 255, 0, 0.03) 0px,
            rgba(0, 255, 0, 0.03) 1px,
            transparent 1px,
            transparent 2px);
    pointer-events: none;
}

.terminal::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center,
            transparent 0%,
            rgba(0, 0, 0, 0.3) 100%);
    pointer-events: none;
}

.command-line {
    display: flex;
    align-items: center;
    font-family: monospace;
}

.command {
    color: #4ade80;
    margin-left: 4px;
    position: relative;
}

.typing-text {
    display: inline-block;
    animation: blink 1s step-end infinite;
    color: #4ade80;
}

@keyframes blink {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }
}

.skill-item {
    margin-bottom: 4px;
    display: flex;
    align-items: center;
}

.output {
    position: relative;
    overflow: hidden;
    animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
    from {
        max-height: 0;
        opacity: 0;
    }

    to {
        max-height: 1000px;
        opacity: 1;
    }
}
</style>