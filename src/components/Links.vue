<template>
  <div class="LinkBox">
    <div class="Links">
      <div class="item" v-for="(item) in dataList" :key="item.id">
        <a :href="item.link" target="_blank">{{ item.label }}</a>
      </div>
    </div>
    <AddLinks v-if="addShowBool" />
  </div>
</template>

<script>
import AddLinks from "./AddLinks";
import axios from "axios";
let doMain = "http://localhost:7777/";
export default {
  name: "Links",
  components: {
    AddLinks
  },
  data() {
    return {
      dataList: [],
      // addShowBool: false
      addShowBool: true
    };
  },
  created() {
    axios.get(doMain + "dataList").then(res => {
      console.log("res----->", res);
      if (res.data.success) {
        this.dataList = res.data.dataList;
      } else {
        console.error("no data");
      }
    });
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.Links {
  width: calc(100vw - 100px);
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  .item {
    min-width: 50px;
    a {
      text-decoration: none;
    }
  }
}
</style>
