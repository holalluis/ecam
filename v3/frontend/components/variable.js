let variable=new Vue({
  el:"#variable",

  data:{
    visible:false,
    id:"wsa_nrg_cons", //default variable code
    question:false,    //question where id belongs

    //stage where id belongs to
    localization:{
      level:'Water',
      sublevel:'Abstraction',
    },

    //backend
    Global,
    Languages,
    Info,
    Structure,
    Units,
    Tables,
    Estimations,
    Exceptions,
    Formulas,
    Questions,
    Cts,
    Benchmarks,
  },

  updated(){
    document.querySelectorAll(".prettyprinted").forEach(el=>{
      el.classList.remove('prettyprinted');
    });
    this.$nextTick(function() {
      PR.prettyPrint();
    });
  },

  methods:{
    translate,
    format,
    go_to,
    go_to_substage,
    locate_variable,
    get_current_unit,
    get_base_unit,
    get_level_color,
    get_variable_type,
    get_sum_of_substages,
    get_output_value,

    /* open variable VIEW */
    view(id, no_history_entry){
      if(!id){
        let err = "variable id not specified"
        throw new Error(err);
        return false;
      }

      if(Info[id]){
        this.id           = id;
        this.question     = this.Questions.is_inside(this.id);
        this.localization = this.locate_variable(id);
      }else{
        throw new Error(`variable "${id}" does not exist at info.js`);
        return;
      }

      ecam.show('variable', no_history_entry);
    },

    get_formula_location(){

      if(this.Global[this.id] && typeof(this.Global[this.id])=='function') return this.Global;

      let level    = this.localization.level;
      let sublevel = this.localization.sublevel;
      let obj;
      if(sublevel){
        obj = Structure.find(s=>(s.level==level&&s.sublevel==sublevel)).class.prototype;
      }else{
        obj = this.Global[level];
      }
      return obj;
    },
  },

  template:`
    <!--variable VIEW-->
    <div id=variable v-if="visible && Languages.ready">
      <!--variable title-->
      <h1>
        <span style=color:#999>
          {{ translate('variable_detailed_info') }}
          &rarr;
        </span>
        <code>{{id}}</code>
        <p v-if="Info[id]" style="margin-bottom:0">
          <code
            style="font-weight:bold"
            v-html="translate(id+'_descr').prettify()">
          </code>
        </p>
        <div v-else>
          ERROR: Variable {{id}} not defined
        </div>
      </h1>

      <!--variable table-->
      <table v-if="Info[id]"
        :style="{
          textAlign  : 'left',
          maxWidth   : '80%',
          margin     : 'auto',
          background : get_level_color(localization.level),
        }"
      >
        <!--variable stage-->
        <tr>
          <th>{{ translate('variable_stage') }}</th>
          <td>
            <div v-if="localization"> &larr;
              <a @click="go_to(localization.level)">
                {{ translate(localization.level) }}
              </a>
              <span v-if="localization.sublevel"> /
                <a @click="go_to(localization.level, localization.sublevel)">
                  {{ translate(localization.sublevel) }}
                </a>
              </span>
            </div>
          </td>
        </tr>

        <!--variable explanation-->
        <tr>
          <th>{{ translate('variable_explanation') }}</th>
          <td>
            <code v-html="translate(id+'_expla').prettify()"></code>
          </td>
        </tr>

        <!--variable is inside a question?-->
        <tr v-if="question">
          <th>Question (yes/no)</th>
          <td>
            <span v-html="translate(question)+'?'"></span>
          </td>
        </tr>

        <!--variable type-->
        <tr>
          <th>{{translate('variable_type')}}</th>
          <td>
            <div style="font-size:large">
              {{get_variable_type(id).ucfirst()}}
            </div>

            <!--variable show formula and inputs involved-->
            <div v-if="get_variable_type(id)=='output'">
              <div style="border:1px solid #ccc;padding:1em">
                <div style="font-weight:bold">
                  <span style="color:#606">{{ translate('variable_formula') }}</span>:
                </div>
                <code>
                  <pre
                    v-html="Formulas.prettify(get_formula_location()[id].toString())"
                    class="prettyprint"
                  ></pre>
                </code>
              </div>

              <!--variable show inputs involved-->
              <div style="margin-top:10px">
                <b>{{ translate('variable_inputs_involved') }}</b>
              </div>

              <!--variable list inputs involved in the formula-->
              <inputs_involved_table
                :code="id"
                :obj="get_formula_location()"
              ></inputs_involved_table>
            </div>
          </td>
        </tr>

        <!--variable current value-->
        <tr>
          <th>{{ translate("Current value") }}</th>
          <td>
            <!--variable current value input element-->
            <div v-if="get_variable_type(id)=='input'">
              <!--input is an Option-->
              <div v-if="Info[id] && Info[id].magnitude=='Option'">
                <div>
                  <div v-if="!localization.sublevel">
                    <select v-model="Global[localization.level][id]">
                      <option v-for="obj,i in Tables[id]" :value="i">
                        {{obj.name}}
                      </option>
                    </select>
                  </div>
                  <div v-else>
                    <table>
                      <tr>
                        <td v-for="ss in Global[localization.level][localization.sublevel]">
                          <div>
                            <a @click="go_to_substage(ss)">{{ss.name}}</a>
                          </div>
                          <div>
                            <select v-model="ss[id]">
                              <option v-for="obj,i in Tables[id]" :value="i">
                                {{obj.name}}
                              </option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
              <!--input is a number-->
              <div v-else>
                <div>
                  <div v-if="!localization.sublevel">
                    <input type=number v-model.number="Global[localization.level][id]">
                  </div>
                  <div v-else>
                    <table>
                      <tr>
                        <td v-for="ss in Global[localization.level][localization.sublevel]">
                          <div>
                            <a @click="go_to_substage(ss)">{{ss.name}}</a>
                          </div>
                          <div>
                            <input type=number v-model.number="ss[id]">
                          </div>
                          <div class=unit v-html="get_base_unit(id).prettify()"></div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <!--variable current value if output-->
            <div v-if="get_variable_type(id)=='output'">
              <div>
                <div v-if="!localization.sublevel">
                  {{
                    format(
                      get_output_value(id, Global[localization.level])
                    )
                  }}
                  <span v-html="get_current_unit(id).prettify()" class=unit></span>
                </div>
                <div v-else>
                  <table>
                    <tr>
                      <td v-for="ss in Global[localization.level][localization.sublevel]">
                        <div>
                          <a @click="go_to_substage(ss)">{{ss.name}}</a>
                        </div>
                        <div v-html="format(get_output_value(id,ss))"></div>
                        <div v-html="get_current_unit(id).prettify()" class=unit></div>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </td>
        </tr>

        <!--variable magnitude-->
        <tr>
          <th>{{ translate('variable_magnitude') }}</th>
          <td>{{ Info[id] ? Info[id].magnitude : "magnitude not defined"}}</td>
        </tr>

        <!--outputs that use this variable-->
        <tr>
          <th>
            {{ translate("Outputs that use this value") }}
          </th>
          <td>
            <table class=outputs_affected>
              <tbody v-for="output in Formulas.outputs_per_input(id)">
                <!--output that uses the input is an estimation-->
                <tr v-if="Estimations[output]">
                  <td :title="translate(output+'_descr')">
                    <a @click="view(output)" :style="{color:get_level_color(locate_variable(output).level)}">
                      {{ output }} (estimation)
                    </a>
                  </td>
                  <td>
                    estimation for each substage
                  </td>
                  <td>
                    <span class=unit v-html="get_base_unit(output).prettify()">
                    </span>
                  </td>
                </tr>

                <!--output that uses the input is normal-->
                <tr v-else>
                  <td :title="translate(output+'_descr')">
                    <a @click="view(output)" :style="{color:get_level_color(locate_variable(output).level)}">
                      {{ output }}
                    </a>
                  </td>
                  <td>
                    <div v-if="!locate_variable(output).sublevel">
                      {{
                        format(
                          get_output_value(output, locate_variable(output).stage)
                        )
                      }}
                    </div>
                    <div v-else>
                      {{
                        locate_variable(output).stage.map(ss=>(
                          format(
                            get_output_value(output, ss)
                          )
                        ))
                      }}
                    </div>
                  </td>
                  <td>
                    <span class=unit v-html="get_current_unit(output).prettify()">
                    </span>
                  </td>
                </tr>

                <!--output that uses the input has a benchmark-->
                <tr v-if="Benchmarks[output]">
                  <td :title="translate(output+'_descr')">
                    <a @click="view(output)" :style="{color:get_level_color(locate_variable(output).level)}">
                      {{ output }} (benchmark)
                    </a>
                  </td>
                  <td>
                    <div>
                      benchmark for each substage
                    </div>
                  </td>
                  <td>
                    <span class=unit v-html="get_base_unit(output).prettify()"></span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="Formulas.outputs_per_input(id).length==0">
              <span style=color:#999>{{ translate('variable_nothing') }}</span>
            </div>
          </td>
        </tr>

        <!--the input has an estimation formula-->
        <tr v-if="Estimations[id]">
          <th>
            Estimation of this input based on other inputs
          </th>
          <td>
            <div>
              estimation of all substages
              <span v-if="Info[id]" v-html="Info[id].unit.prettify()" class=unit></span>
            </div>

            <!--formula for estimations-->
            <div style="border:1px solid #ccc;padding:1em">
              <pre
                class=prettyprint
                v-html="Formulas.prettify( Estimations[id].toString() )"
              ></pre>
            </div>

            <!--inputs involved in the estimations equation-->
            <inputs_involved_table
              :code="id"
              :obj="Estimations"
            ></inputs_involved_table>
          </td>
        </tr>

        <!--the input is used in benchmarks?-->
        <tr>
          <th>
            Is this variable in
            <a
              v-html="'benchmarks'"
              style="text-decoration:underline;color:white"
              onclick="ecam.show('benchmarks')">
            </a>
            ?
          </th>
          <td v-if="Benchmarks[id]">
            Yes
            <details open>
              <summary>formula</summary>
              <div>
                <code><pre class=prettyprint v-html="Formulas.prettify(Benchmarks[id])"></pre></code>
              </div>
            </details>
          </td>
          <td v-else style=color:#999>{{translate('no')}}</td>
        </tr>
      </table>
    </div>
  `,

  style:`
    <style>
      #variable h1 {
        text-align:center;
      }

      #variable td {
        padding:1em;
        background:white;
      }
      #variable th {
        padding:1em;
        background:inherit;
        color:white;
        vertical-align:top;
      }

      #variable input[type=number] {
        background:#eee;
        border: none;
        cursor: cell;
        height: 40px;
        padding: 0 0.2em;
        text-align:right;
      }
      #variable input[type=number]:focus {
        background:white;
      }

      #variable table.inputs_involved td {
        padding: 5px;
        border:none;
      }
      #variable table.outputs_affected td {
        padding: 5px;
        border:none;
      }
      #variable summary {
        cursor:pointer;
      }
    </style>
  `,
});
