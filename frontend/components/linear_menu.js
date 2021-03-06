let linear_menu = new Vue({
  el:"#linear_menu",
  data:{
    visible      : true,
    current_view : 'landing',

    Global,
    Languages,
    Info,
  },
  methods:{
    translate,
    format,

    is_summaries_menu_visible(){
      return summaries_menu.visible;
    },

    show_summaries_menu(){
      summaries_menu.visible=true;
    },
  },

  template:`
    <!--linear menu COMPONENT-->
    <div id=linear_menu v-if="visible && Languages.ready">
      <div id=select_view class=flex>
        <!--landing / home-->
        <div
          onclick="ecam.show('landing')"
          :selected="current_view=='landing'"
        >
          <div>{{translate('Home')}}</div>
        </div>

        <!--scenarios-->
        <div
          onclick="ecam.show('select_scenario')"
          :selected="current_view=='select_scenario'"
        >
          <div>{{translate('Configuration')}}</div>
        </div>

        <!--stages-->
        <div
          onclick="ecam.show('tier_b')"
          :selected="current_view=='tier_b'"
        >
          <div>{{translate('Inventory')}}</div>
        </div>

        <!--overview-->
        <div
          onclick="summaries_menu.show(summaries_menu.current_view)"
          :selected="is_summaries_menu_visible()"
        >
          <div>{{translate('Results')}}</div>
        </div>

        <!--compare-->
        <div
          onclick="ecam.show('compare_scenarios')"
          :selected="current_view=='compare_scenarios'"
        >
          <div>{{translate('Compare assessments')}}</div>
        </div>

        <!--more (old sidebar)-->
        <div
          onclick="ecam.show('more')"
          :selected="current_view=='more'"
        >
          <div>{{translate('More')}}</div>
        </div>
      </div>

      <!--current scenario-->
      <div>
        <div>
          <b style="color:#aaa">{{translate('You are editing')}}</b>
          <b>{{Global.General.Name}}</b>
        </div>
        <div>
          <span v-html="format(Global.TotalGHG().total)"></span>
          <span class=unit v-html="Info.TotalGHG.unit.prettify()"></span>
          &nbsp;
          <span :style="{color:(Global.Days()<=0?'red':'')}">
            <span v-html="format(Global.Days())"></span>
            <span class=unit v-html="translate('days')"></span>
          </span>
          &nbsp;
          <span :style="{color:(Global.General.conv_kwh_co2<=0?'red':'')}">
            <span v-html="format(Global.General.conv_kwh_co2)"></span>
            <span class=unit v-html="Info.conv_kwh_co2.unit.prettify()"></span>
          </span>
        </div>
      </div>
    </div>
  `,

  style:`
    <style>
      #linear_menu {
        background:white;
        border-bottom:1px solid #ccc;
        padding:0 2em;
        display:flex;
        justify-content:space-between;
        align-items:flex-end; /*align to bottom*/
      }
      #linear_menu {
        display:flex;
      }
      #linear_menu #select_view > div {
        color:#3c3c3b;
        font-weight:bold;
        padding:2em 1em 0.2em 1em;
        border-bottom:4px solid transparent;
        box-sizing:border-box;
        margin-right:1px;
      }
      #linear_menu #select_view > div[selected],
      #linear_menu #select_view > div:hover {
        color:black;
        border-color:var(--color-level-generic);
      }
      #linear_menu #select_view a:hover {
        text-decoration:none;
      }
    </style>
  `,
});
