<template>
  <div id="TopicListPage">
    <HeaderBar/>
    <TopTab/>
    <TopicList/>
    <MenuBar/>
  </div>
</template>

<script>
import MenuBar from '../MenuBar';
import HeaderBar from '../HeaderBar';
import TopTab from '../TopTab';
import TopicList from '../TopicList';

export default {
  name: 'TopicListPage',
  components: {
    MenuBar,
    TopTab,
    TopicList,
    HeaderBar
  }
}
</script>
