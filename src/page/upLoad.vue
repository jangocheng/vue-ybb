<template>
<div id="app">
    <input type="file" name="uploadImage" value="">
    <img :src="imageSrc" @load="loadEvent($event)" width="200" alt="">
    <button @click="clickEvent()">获取</button>
</div>
</template>
