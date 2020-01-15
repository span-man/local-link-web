<template>
  <div class="LinkBox">
    <div class="Links">
      <div
        class="item"
        v-for="(item) in dataList"
        :key="item.id"
        @contextmenu.prevent="contextMenu(item)"
      >
        <a :href="item.link" target="_blank">{{ item.label }}</a>
      </div>
    </div>
    <AddLinks
      @close="addShowBool = false"
      @findatalist="finDataList"
      v-if="addShowBool"
      :nowitem="nowItem"
      :status="addOrUpdate"
    />
    <ContextMune
      @add="add"
      @del="del"
      @update="update"
      @close="rightClickMuneBool = false"
      :left="mouseX"
      :top="mouseY"
      v-if="rightClickMuneBool"
    />
  </div>
</template>

<script>
import utils from "../assets/js/utils/utils";
import AddLinks from "./AddLinks";
import ContextMune from "./ContextMune";
import axios from "axios";
let doMain = "http://localhost:7778/";
export default {
  name: "Links",
  components: {
    AddLinks,
    ContextMune
  },
  data() {
    return {
      dataList: [],
      addShowBool: false, // 新增 现实与否
      // addShowBool: true,
      rightClickMuneBool: false,
      mouseX: 0,
      mouseY: 0,
      addOrUpdate: "add" // 当前的 提交状态 新增 或者 更新
    };
  },
  created() {
    this.finDataList();
  },
  mounted() {
    window.addEventListener("contextmenu", e => {
      e.preventDefault();
      window.onclick = () => {
        console.log(121113);
        this.rightClickMuneBool = false;
      };
    });
  },
  methods: {
    // 获取所有连接
    finDataList() {
      axios.get(doMain + "findAll").then(res => {
        console.log("res----->", res);
        if (res.data.success) {
          this.dataList = res.data.dataList;
        } else {
          console.error("no data");
        }
      });
    },
    // 右键下拉菜单事件
    contextMenu(item) {
      console.log(123);
      this.rightClickMuneBool = true;
      this.mouseX = utils.getMousePos().x;
      this.mouseY = utils.getMousePos().y;

      this.nowItem = item;
    },
    add() {
      console.log("add");
      let object = this.nowItem;
      for (const key in object) {
        object[key] = ''
      }
      this.nowItem = object;
      this.addShowBool = true;
      this.addOrUpdate = "add";
    },
    del() {
      console.log("del", this.nowItem);
      axios.post(doMain + "delLink", { id: this.nowItem.id }).then(res => {
        console.log("res----->", res);
        if (res.data.success) {
          this.finDataList();
        }
      });
    },
    update() {
      console.log("update-_item->", this.nowItem);
      this.addShowBool = true;
      this.addOrUpdate = "update";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.Links {
  width: calc(100vw - 100px);
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .item {
    min-width: 50px;
    margin: 5px 10px;
    a {
      text-decoration: none;
    }
  }
}
</style>
