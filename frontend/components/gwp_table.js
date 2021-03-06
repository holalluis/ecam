let gwp_table = new Vue({
  el:"#gwp_table",

  data:{
    visible:false,

    Global,
    Configuration,
    GWP_reports,
  },

  methods:{
    translate,
    set_constants_from_gwp_report(){
      select_scenario.set_constants_from_gwp_report();
    },
  },

  template:`
    <!--gwp table VIEW-->
    <div id=gwp_table v-if="visible">
      <h1 style="text-align:center">
        <a onclick="ecam.show('select_scenario')">{{translate('configuration')}}</a>
        &rsaquo;
        <span style=color:black>{{translate('gwp_title')}}</span>
      </h1>

      <table style="margin:auto">
        <tr>
          <th colspan=6>{{translate('gwp_title_table')}}</th>
        </tr>
        <tr>
          <th>{{translate('Report')}}</th>
          <th>CO<sub>2</sub><br><small>(CO<sub>2</sub> {{translate('equivalents')}})</small></th>
          <th>CH<sub>4</sub><br><small>(CO<sub>2</sub> {{translate('equivalents')}})</small></th>
          <th>N<sub>2</sub>O<br><small>(CO<sub>2</sub> {{translate('equivalents')}})</small></th>
          <th>{{translate('Comments')}}</th>
          <th>{{translate("Select")}}</th>
        </tr>
        <tr v-for="rep,i in GWP_reports"
          :class="Configuration.gwp_reports_index==i ? 'selected':''">
          <td><b>{{rep.report}}</b></td>
          <td class=number>1</td>
          <td class=number>{{rep.ct_ch4_eq}}</td>
          <td class=number>{{rep.ct_n2o_eq}}</td>
          <td><small v-if="rep.comment">{{translate(rep.comment)}}</small></td>
          <td>
            <button @click="Configuration.gwp_reports_index=i;set_constants_from_gwp_report()">
              {{translate("select")}}
            </button>
          </td>
        </tr>
      </table>
    </div>
  `,

  style:`
    <style>
      #gwp_table tr.selected {
        background:yellow;
      }
      #gwp_table th {
        color:white;
        background:var(--color-level-generic);
      }
      #gwp_table td.number{
        text-align:right;
      }
    </style>
  `,

});
