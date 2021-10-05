<template>
    <div class="logo-wrapper">
        <!-- <img src="~@/assets/logo.png" alt=""> -->
        <span v-if="!isCollapse" class="logo-text">后台管理</span>
    </div>
</template>

<script lang="ts">
import{ defineComponent }from 'vue';
export default defineComponent({
    name: "",
    props:{
        isCollapse:{
            type:Boolean,
            default:true
        }
    },
    setup: () => {

    }
})
</script>
<style scoped>
.logo-wrapper{
    height:60px;
    margin:0 auto;
    display:flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(203, 214, 209, 0.685);
    overflow:hidden;
}
.logo-wrapper img{
    width:50px;
}
.logo-wrapper span{
    color: black;
}
.logo-text{
    white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>