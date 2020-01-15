
<template>
  <div @click.stop :style="makeStyle(left, top)" class="contextMune">
    <div @click.stop class="ul">
      <div
        v-for="(item) in dataList"
        :key="item.id"
        @click.prevent="handleClick(item.status)"
        class="li"
      >{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    top: {
      type: Number,
      default: () => {
        return 0;
      }
    },
    left: {
      type: Number,
      default: () => {
        return 0;
      }
    }
  },
  data() {
    return {
      dataList: [
        {
          name: "新增",
          status: "add"
        },
        {
          name: "删除",
          status: "del"
        },
        {
          name: "改动",
          status: "update"
        }
      ]
    };
  },
  watch: {
    top(val) {
      console.log(val);
    },
    left(val) {
      console.log(val);
    }
  },
  methods: {
    makeStyle(x, y) {
      return `left:${x}px;top:${y}px;`;
    },
    handleClick(status) {
      if (status == "add") {
        this.$emit("add");
      }
      if (status == "del") {
        console.log("删除-->", status);
        this.$emit("del");
      }
      if (status == "update") {
        console.log("改动-->", status);
        this.$emit("update");
      }
      setTimeout(() => {
        this.$emit("close");
      }, 200);
    }
  }
};
</script>

<style lang="less" scoped>
.contextMune {
  position: absolute;
  list-style: none;
  width: 200px;
  min-height: 300px;
  background: #f1f1f1;
  border-radius: 5px;
  .ul {
    display: flex;
    flex-direction: column;
    padding: 8px 5px;
    .li {
      cursor: pointer;
      display: flex;
      flex-direction: row;
      justify-content: left;
      height: 30px;
      line-height: 30px;
      border-bottom: 1px solid #ccc;
      width: 100%;
      list-style: none;
    }
  }
}
</style>
