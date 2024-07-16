<script setup lang="ts">
import { NavElement } from '../../types.ts'
import { onMounted, ref } from 'vue'
import DocMenuLink from './DocMenuLink.vue'

const props = defineProps<{
    children: NavElement[]
}>()

const activeId = ref<string | null>(null)

function setActiveId() {
    activeId.value = window.location.hash.slice(1)
}
onMounted(() => {
    window.addEventListener('hashchange', setActiveId)
    setTimeout(setActiveId, 400)
})
</script>

<template>
    <aside>
        <nav>
            <ul class="first-level">
                <li v-for="child in props.children" :key="child.id">
                    <DocMenuLink
                        :active="activeId === child.id"
                        :anchor-id="child.id"
                        :level="1"
                        class="first-level-link"
                    >
                        {{ child.text }}
                    </DocMenuLink>
                    <ul class="second-level">
                        <li
                            v-for="subChild in child.children"
                            :key="subChild.id"
                        >
                            <DocMenuLink
                                :active="activeId === subChild.id"
                                :anchor-id="subChild.id"
                                :level="2"
                            >
                                {{ subChild.text }}
                            </DocMenuLink>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<style scoped lang="scss">
aside {
    padding: 2rem;
    background-color: #2d2d2d;
    height: 100vh;
    color: white;
    font-size: 17px;
    overflow-y: auto;

    ul {
        list-style: none;
    }

    .first-level {
        padding-left: 0;

        > li {
            margin-bottom: 1.5rem;
        }

        .first-level-link + ul {
            margin-top: 0.5rem;
        }
    }

    .second-level {
        padding-left: 1rem;

        > li {
            margin-bottom: 0.5rem;
        }
    }
}
</style>
