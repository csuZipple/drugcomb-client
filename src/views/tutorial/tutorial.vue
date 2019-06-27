<template>
  <FullPage>
    <section class="tutorial-container">
      <div>
        <HeaderTitle>
          Search a drug of interest
        </HeaderTitle>
        <p>
          Users can input a single drug name or drug combinations on the homepage to launch the search process. For a quick trial, user just click an example displayed below the input box to view the list of drug combinations.
        </p>
        <img src="../../assets/tutorial/home.png" alt="home.png">
        <HeaderTitle>
          List of drug combinations
        </HeaderTitle>
        <p>
          To view the list of drug combinations available, one can click the COMBINATION link of the navigation bar. The drug combinations are tabular listed, together with the individual drugs, cancer cell line and synergy score.
        </p>
        <img src="../../assets/tutorial/list.png" alt="list.png">
        <p>
          Clicking the name of single drug will display the list of drug targets, as well as the indication and Pharmacodynamics and Mechanism of action;
        </p>
        <p>
          The Synergy Score represents the synergistic effect or antagonistic effect between the pair of drug combinations. Formally, the drug combinations with score greater than 0 are classified as synergistic ones, otherwise antagonistic ones. Clicking the syerngy score will display the dose response matrix within a popup dialog, together with the basic information and chemical structure of individual drugs.
        </p>
        <p>
          In addition, user can easily filter the drug combinations involved in a drug of interest, by taking advantage of the functionality of prefix-match auto-complete of drug name.
        </p>
        <img src="../../assets/tutorial/search-tips.png" alt="search-tips.png">
        <HeaderTitle>
          Dose response matrix and drug chemical structure
        </HeaderTitle>
        <p>
          Within the dose response dialog, the raw dose response matrix and Bliss matrix are displayed in the form of heat map. The heat map is a color grid, in which each cell is the IC50 value of the cancer cell viability when treated by two drugs. Furthermore, the color of each element corresponds to its dose response value. On the right, the basic information and chemical structures of two drugs are displayed, together with the external links such as PubChem, STITCH.
        </p>
        <img src="../../assets/tutorial/matrix.png" alt="matrix.png">
        <p>
          On the dose response dialog, user can also easily switch to the tabular view that shows individual drugs, their concentrations, response level of cancer cells, bliss score and abbreviation of data source.
        </p>
        <img src="../../assets/tutorial/table.png" alt="table.png">
        <HeaderTitle>
          List of drug targets
        </HeaderTitle>
        <p>
          User will be forwaded to the drug target page when he click individual drug name in the drug combination list. At the top of this page, top-10 targets will be displayed in a graph, in which the drug is shown in rounded rectangle and the targets are shown in circles. On the right side of the graph, a brief description of the drug is shown.
        </p>
        <img style="width: 50%;" src="../../assets/tutorial/drug_network.png" alt="drug_network.png">
        <p>
          Listed below the top-10 target graphs is the detailed information of the drug targets extracted from STITCH database.
        </p>
        <img src="../../assets/tutorial/protein_table.png" alt="protein_table.png">
        <HeaderTitle>
          Download data sets
        </HeaderTitle>
        <p>
          To facilitate users to conduct further wet-lab and in silico screening experiments, we provide the links for downloading our pre-built datasets. All drug combinations in company with cancer cell lines and computed synergy scores can be freely download. Futhermore, we have built another dataset of drug cominbations classified in synergistic and antagonsistic effect according the bliss and ZIP synergy score. With the assistance of data curation provided by DrugCombDB, we expect that the in silico prediction of synergistic drug combination or preclinical experiments may benefit from such efforts.
        </p>
      </div>
    </section>
  </FullPage>
</template>

<script>
import FullPage from '../../components/FullPage/FullPage'
import HeaderTitle from '../../components/Header/HeaderTitle'
export default {
  name: 'tutorial',
  components: {HeaderTitle, FullPage}
}
</script>

<style lang="less" scoped>
  @import "../../assets/style/main";
  .tutorial-container {
    margin-top: 5px;
    padding: 15px 30px;
    min-height: calc(100vh - 75px);
    text-align: left;
    background: #ffffff;

  & > div {
      width: 1000px;
      margin: 0 auto;
      height: 100%;
      display: flex;
      flex-direction: column;
      p{
        padding: 5px 10px;
      }
     .p-title{
       font-size: 18px;
       font-weight: bold;
     }
      img{
        margin: 0 auto;
        padding: 10px 20px;
        width: 90%;
        object-fit: contain;
        align-self: center;
      }
    }
  }
</style>
