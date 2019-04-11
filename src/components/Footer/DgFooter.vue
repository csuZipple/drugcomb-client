<template>
  <footer>

    <div class="footer-info-container">
      <div>
        Copyright © 2018-2019 DrugCombDB. All Rights Reserved.
      </div>
      <div>
        Author: Changzhou University  & CSU
      </div>
      <div>
       DataSource: NCI & PMC3926026 & PMC5248573 & PMID26983881
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'DgFooter'
}
</script>

<style lang="less" scoped>
  @import "../../assets/style/main";
  footer{
    height: 200px;
    width: 100%;
    background: @footer-color;
    font-family: Helvetica, Tahoma, Arial, "Hiragino Sans GB", "Hiragino Sans GB W3", "Microsoft YaHei", STXihei, STHeiti, Heiti, SimSun, sans-serif;
    font-size: 14px;
    color: #666;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .footer-info-container{
      width: 70%;
      height: 50%;
      border-top: 1px solid #666;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
      &>div:first-child{
        margin-top: 20px;
      }
      &>div{
        margin: 5px;
      }
    }
  }
</style>
