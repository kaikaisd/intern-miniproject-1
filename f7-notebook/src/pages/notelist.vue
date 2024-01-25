<template>
  <f7-page name="list">
    <f7-navbar title="List Post" back-link="Back"></f7-navbar>
    <f7-block>
        <f7-list>
            <f7-list-item
            v-for="item in items"
            :key="item.id"
            :title="item.title"
            :link="'/post/' + item.id"
            panel-close
            ></f7-list-item>
        </f7-list>
    </f7-block>
    </f7-page>
</template>

<script>
export default {
    name: 'ListPost',
    props: {
        items: Object,
        //f7router: Object,
    },
}
</script>

<style>

</style>