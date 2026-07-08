import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/pages/fast500/Fast500.vue");import { defineComponent as _defineComponent } from "/node_modules/.vite/deps/vue.js?v=d042d785";
import { computed } from "/node_modules/.vite/deps/vue.js?v=d042d785";
import { useRouter } from "/node_modules/.vite/deps/vue-router.js?v=33bb5fbc";
import { useExamStore } from "/src/composables/useExamStore.ts";
const _sfc_main = /* @__PURE__ */ _defineComponent({
  __name: "Fast500",
  setup(__props, { expose: __expose }) {
    __expose();
    const router = useRouter();
    const { currentSubject } = useExamStore();
    const pageTitle = computed(() => `《${currentSubject.value}》速成200题`);
    const goBack = () => {
      router.back();
    };
    const start = () => {
      router.push({
        path: "/quiz",
        query: {
          title: pageTitle.value,
          source: "fast200",
          subject: currentSubject.value
        }
      });
    };
    const __returned__ = { router, currentSubject, pageTitle, goBack, start };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
import { createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, createStaticVNode as _createStaticVNode, openBlock as _openBlock, createElementBlock as _createElementBlock } from "/node_modules/.vite/deps/vue.js?v=d042d785";
const _hoisted_1 = { class: "flex flex-col h-full bg-gradient-to-b from-[#0B63F6] via-[#2D8CFF] to-[#F8FAFD]" };
const _hoisted_2 = { class: "bg-transparent sticky top-0 z-20" };
const _hoisted_3 = { class: "flex items-center justify-between px-4 h-[44px]" };
const _hoisted_4 = { class: "flex-1 px-2 text-center" };
const _hoisted_5 = { class: "text-sm font-black text-white truncate" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock("div", _hoisted_1, [
    _createElementVNode("header", _hoisted_2, [
      _createElementVNode("div", _hoisted_3, [
        _createElementVNode("button", {
          class: "w-8 h-8 flex items-center justify-center",
          onClick: $setup.goBack
        }, [..._cache[0] || (_cache[0] = [
          _createElementVNode(
            "span",
            {
              class: "iconify text-2xl text-white",
              "data-icon": "mdi:chevron-left"
            },
            null,
            -1
            /* CACHED */
          )
        ])]),
        _createElementVNode("div", _hoisted_4, [
          _createElementVNode(
            "div",
            _hoisted_5,
            _toDisplayString($setup.pageTitle),
            1
            /* TEXT */
          )
        ]),
        _cache[1] || (_cache[1] = _createElementVNode(
          "div",
          { class: "w-8" },
          null,
          -1
          /* CACHED */
        ))
      ])
    ]),
    _cache[2] || (_cache[2] = _createStaticVNode('<main class="flex-1 overflow-y-auto px-4 pt-4 pb-24 space-y-4" data-v-79ccc1a2><section class="bg-white/15 backdrop-blur rounded-2xl p-4 border border-white/20" data-v-79ccc1a2><div class="flex items-start justify-between gap-3" data-v-79ccc1a2><div class="min-w-0" data-v-79ccc1a2><div class="text-[18px] font-black text-white leading-snug" data-v-79ccc1a2>没时间刷题 就用速成200题</div><div class="text-[12px] text-white/80 font-bold mt-2" data-v-79ccc1a2>精选题库 · 高频考点 · 省时省力</div></div><div class="shrink-0 bg-white/20 border border-white/25 text-white text-[11px] font-black px-3 py-1.5 rounded-full" data-v-79ccc1a2> 98%通过率 </div></div></section><section class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100" data-v-79ccc1a2><div class="text-[14px] font-black text-gray-900 mb-3" data-v-79ccc1a2>普通题库 vs 精选题库</div><div class="grid grid-cols-2 gap-3" data-v-79ccc1a2><div class="rounded-2xl border border-gray-200 p-3 bg-gray-50" data-v-79ccc1a2><div class="text-[12px] font-black text-gray-900" data-v-79ccc1a2>普通题库</div><div class="mt-2 text-[20px] font-black text-gray-900" data-v-79ccc1a2>近2000题</div><div class="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-gray-500 bg-white border border-gray-200 px-2 py-1 rounded-full" data-v-79ccc1a2><span class="iconify text-[14px]" data-icon="mdi:clock-outline" data-v-79ccc1a2></span> 无重点，时间长 </div></div><div class="rounded-2xl border border-[#FFD27E] p-3 bg-gradient-to-br from-[#FFF2CC] to-[#FFE08A] relative overflow-hidden" data-v-79ccc1a2><div class="absolute -top-8 -right-8 w-24 h-24 bg-[#FFB300]/20 rounded-full blur-2xl" data-v-79ccc1a2></div><div class="relative z-10" data-v-79ccc1a2><div class="text-[12px] font-black text-gray-900" data-v-79ccc1a2>精选题库</div><div class="mt-2 text-[22px] font-black text-gray-900" data-v-79ccc1a2>200题</div><div class="mt-2 inline-flex items-center gap-1 text-[11px] font-black text-[#8A4B00] bg-white/70 border border-white/60 px-2 py-1 rounded-full" data-v-79ccc1a2><span class="iconify text-[14px] text-[#E91927]" data-icon="mdi:fire" data-v-79ccc1a2></span> 高频考点 省时省力 </div></div></div></div></section><section class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100" data-v-79ccc1a2><div class="text-[14px] font-black text-gray-900 mb-3" data-v-79ccc1a2>功能亮点</div><div class="space-y-2" data-v-79ccc1a2><div class="flex items-start gap-2 bg-blue-50 rounded-xl p-3 border border-blue-100" data-v-79ccc1a2><span class="iconify text-[18px] text-[#0B63F6] mt-0.5" data-icon="mdi:check-circle-outline" data-v-79ccc1a2></span><div class="text-[12px] text-gray-800 font-bold leading-relaxed" data-v-79ccc1a2>200题高频考点覆盖：集中学习最核心、最常考的考点，拒绝无效刷题。</div></div><div class="flex items-start gap-2 bg-orange-50 rounded-xl p-3 border border-orange-100" data-v-79ccc1a2><span class="iconify text-[18px] text-[#FF6B00] mt-0.5" data-icon="mdi:lightbulb-on-outline" data-v-79ccc1a2></span><div class="text-[12px] text-gray-800 font-bold leading-relaxed" data-v-79ccc1a2>技巧学习更高效：每一题配有独家技巧讲解，轻松理解。</div></div></div></section></main>', 1)),
    _createElementVNode("div", { class: "absolute left-0 right-0 bottom-0 bg-white/95 backdrop-blur border-t border-gray-100 px-4 py-3" }, [
      _createElementVNode("button", {
        class: "w-full py-3 rounded-2xl bg-[#E91927] text-white font-black text-sm shadow-sm active:scale-95 transition-transform",
        onClick: $setup.start
      }, " 立即解锁速成200题 ")
    ])
  ]);
}
import "/src/pages/fast500/Fast500.vue?vue&type=style&index=0&scoped=79ccc1a2&lang.css";
_sfc_main.__hmrId = "79ccc1a2";
typeof __VUE_HMR_RUNTIME__ !== "undefined" && __VUE_HMR_RUNTIME__.createRecord(_sfc_main.__hmrId, _sfc_main);
import.meta.hot.on("file-changed", ({ file }) => {
  __VUE_HMR_RUNTIME__.CHANGED_FILE = file;
});
import.meta.hot.accept((mod) => {
  if (!mod) return;
  const { default: updated, _rerender_only } = mod;
  if (_rerender_only) {
    __VUE_HMR_RUNTIME__.rerender(updated.__hmrId, updated.render);
  } else {
    __VUE_HMR_RUNTIME__.reload(updated.__hmrId, updated);
  }
});
import _export_sfc from "/@id/__x00__plugin-vue:export-helper";
export default /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-79ccc1a2"], ["__file", "C:/Users/qnm-6/Desktop/trae_projects/trae_projects/src/pages/fast500/Fast500.vue"]]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IjtBQUNBLFNBQVMsZ0JBQWdCO0FBQ3pCLFNBQVMsaUJBQWlCO0FBQzFCLFNBQVMsb0JBQW9COzs7OztBQUU3QixVQUFNLFNBQVMsVUFBVTtBQUN6QixVQUFNLEVBQUUsZUFBZSxJQUFJLGFBQWE7QUFFeEMsVUFBTSxZQUFZLFNBQVMsTUFBTSxJQUFJLGVBQWUsS0FBSyxTQUFTO0FBRWxFLFVBQU0sU0FBUyxNQUFNO0FBQ25CLGFBQU8sS0FBSztBQUFBLElBQ2Q7QUFFQSxVQUFNLFFBQVEsTUFBTTtBQUNsQixhQUFPLEtBQUs7QUFBQSxRQUNWLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxVQUNMLE9BQU8sVUFBVTtBQUFBLFVBQ2pCLFFBQVE7QUFBQSxVQUNSLFNBQVMsZUFBZTtBQUFBLFFBQzFCO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDs7Ozs7OztxQkFJTyxPQUFNLGtGQUFpRjtxQkFDbEYsT0FBTSxtQ0FBa0M7cUJBQ3pDLE9BQU0sa0RBQWlEO3FCQUlyRCxPQUFNLDBCQUF5QjtxQkFDN0IsT0FBTSx5Q0FBd0M7O3VCQVAzRCxvQkEwRU0sT0ExRU4sWUEwRU07QUFBQSxJQXpFSixvQkFVUyxVQVZULFlBVVM7QUFBQSxNQVRQLG9CQVFNLE9BUk4sWUFRTTtBQUFBLFFBUEosb0JBRVM7QUFBQSxVQUZELE9BQU07QUFBQSxVQUE0QyxTQUFPO0FBQUE7VUFDL0Q7QUFBQSxZQUE4RTtBQUFBO0FBQUEsY0FBeEUsT0FBTTtBQUFBLGNBQThCLGFBQVU7QUFBQTs7Ozs7O1FBRXRELG9CQUVNLE9BRk4sWUFFTTtBQUFBLFVBREo7QUFBQSxZQUF5RTtBQUFBLFlBQXpFO0FBQUEsWUFBeUUsaUJBQWxCLGdCQUFTO0FBQUE7QUFBQTtBQUFBO0FBQUE7a0NBRWxFO0FBQUEsVUFBdUI7QUFBQSxZQUFsQixPQUFNLE1BQUs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7SUF5RHBCLG9CQU9NLFNBUEQsT0FBTSxnR0FBK0Y7QUFBQSxNQUN4RyxvQkFLUztBQUFBLFFBSlAsT0FBTTtBQUFBLFFBQ0wsU0FBTztBQUFBLFNBQ1QsY0FFRDtBQUFBIiwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJGYXN0NTAwLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICd2dWUtcm91dGVyJ1xuaW1wb3J0IHsgdXNlRXhhbVN0b3JlIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvdXNlRXhhbVN0b3JlJ1xuXG5jb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKVxuY29uc3QgeyBjdXJyZW50U3ViamVjdCB9ID0gdXNlRXhhbVN0b3JlKClcblxuY29uc3QgcGFnZVRpdGxlID0gY29tcHV0ZWQoKCkgPT4gYOOAiiR7Y3VycmVudFN1YmplY3QudmFsdWV944CL6YCf5oiQMjAw6aKYYClcblxuY29uc3QgZ29CYWNrID0gKCkgPT4ge1xuICByb3V0ZXIuYmFjaygpXG59XG5cbmNvbnN0IHN0YXJ0ID0gKCkgPT4ge1xuICByb3V0ZXIucHVzaCh7XG4gICAgcGF0aDogJy9xdWl6JyxcbiAgICBxdWVyeToge1xuICAgICAgdGl0bGU6IHBhZ2VUaXRsZS52YWx1ZSxcbiAgICAgIHNvdXJjZTogJ2Zhc3QyMDAnLFxuICAgICAgc3ViamVjdDogY3VycmVudFN1YmplY3QudmFsdWVcbiAgICB9XG4gIH0pXG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwiZmxleCBmbGV4LWNvbCBoLWZ1bGwgYmctZ3JhZGllbnQtdG8tYiBmcm9tLVsjMEI2M0Y2XSB2aWEtWyMyRDhDRkZdIHRvLVsjRjhGQUZEXVwiPlxuICAgIDxoZWFkZXIgY2xhc3M9XCJiZy10cmFuc3BhcmVudCBzdGlja3kgdG9wLTAgei0yMFwiPlxuICAgICAgPGRpdiBjbGFzcz1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBweC00IGgtWzQ0cHhdXCI+XG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJ3LTggaC04IGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCIgQGNsaWNrPVwiZ29CYWNrXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJpY29uaWZ5IHRleHQtMnhsIHRleHQtd2hpdGVcIiBkYXRhLWljb249XCJtZGk6Y2hldnJvbi1sZWZ0XCI+PC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZsZXgtMSBweC0yIHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtc20gZm9udC1ibGFjayB0ZXh0LXdoaXRlIHRydW5jYXRlXCI+e3sgcGFnZVRpdGxlIH19PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidy04XCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2hlYWRlcj5cblxuICAgIDxtYWluIGNsYXNzPVwiZmxleC0xIG92ZXJmbG93LXktYXV0byBweC00IHB0LTQgcGItMjQgc3BhY2UteS00XCI+XG4gICAgICA8c2VjdGlvbiBjbGFzcz1cImJnLXdoaXRlLzE1IGJhY2tkcm9wLWJsdXIgcm91bmRlZC0yeGwgcC00IGJvcmRlciBib3JkZXItd2hpdGUvMjBcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZsZXggaXRlbXMtc3RhcnQganVzdGlmeS1iZXR3ZWVuIGdhcC0zXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm1pbi13LTBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LVsxOHB4XSBmb250LWJsYWNrIHRleHQtd2hpdGUgbGVhZGluZy1zbnVnXCI+5rKh5pe26Ze05Yi36aKYIOWwseeUqOmAn+aIkDIwMOmimDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtWzEycHhdIHRleHQtd2hpdGUvODAgZm9udC1ib2xkIG10LTJcIj7nsr7pgInpopjlupMgwrcg6auY6aKR6ICD54K5IMK3IOecgeaXtuecgeWKmzwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzaHJpbmstMCBiZy13aGl0ZS8yMCBib3JkZXIgYm9yZGVyLXdoaXRlLzI1IHRleHQtd2hpdGUgdGV4dC1bMTFweF0gZm9udC1ibGFjayBweC0zIHB5LTEuNSByb3VuZGVkLWZ1bGxcIj5cbiAgICAgICAgICAgIDk4JemAmui/h+eOh1xuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgPHNlY3Rpb24gY2xhc3M9XCJiZy13aGl0ZSByb3VuZGVkLTJ4bCBwLTQgc2hhZG93LXNtIGJvcmRlciBib3JkZXItZ3JheS0xMDBcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtWzE0cHhdIGZvbnQtYmxhY2sgdGV4dC1ncmF5LTkwMCBtYi0zXCI+5pmu6YCa6aKY5bqTIHZzIOeyvumAiemimOW6kzwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtM1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLWdyYXktMjAwIHAtMyBiZy1ncmF5LTUwXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1bMTJweF0gZm9udC1ibGFjayB0ZXh0LWdyYXktOTAwXCI+5pmu6YCa6aKY5bqTPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibXQtMiB0ZXh0LVsyMHB4XSBmb250LWJsYWNrIHRleHQtZ3JheS05MDBcIj7ov5EyMDAw6aKYPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibXQtMiBpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgdGV4dC1bMTFweF0gZm9udC1ib2xkIHRleHQtZ3JheS01MDAgYmctd2hpdGUgYm9yZGVyIGJvcmRlci1ncmF5LTIwMCBweC0yIHB5LTEgcm91bmRlZC1mdWxsXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaWNvbmlmeSB0ZXh0LVsxNHB4XVwiIGRhdGEtaWNvbj1cIm1kaTpjbG9jay1vdXRsaW5lXCI+PC9zcGFuPlxuICAgICAgICAgICAgICDml6Dph43ngrnvvIzml7bpl7Tplb9cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLVsjRkZEMjdFXSBwLTMgYmctZ3JhZGllbnQtdG8tYnIgZnJvbS1bI0ZGRjJDQ10gdG8tWyNGRkUwOEFdIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFic29sdXRlIC10b3AtOCAtcmlnaHQtOCB3LTI0IGgtMjQgYmctWyNGRkIzMDBdLzIwIHJvdW5kZWQtZnVsbCBibHVyLTJ4bFwiPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJlbGF0aXZlIHotMTBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtWzEycHhdIGZvbnQtYmxhY2sgdGV4dC1ncmF5LTkwMFwiPueyvumAiemimOW6kzwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibXQtMiB0ZXh0LVsyMnB4XSBmb250LWJsYWNrIHRleHQtZ3JheS05MDBcIj4yMDDpopg8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm10LTIgaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHRleHQtWzExcHhdIGZvbnQtYmxhY2sgdGV4dC1bIzhBNEIwMF0gYmctd2hpdGUvNzAgYm9yZGVyIGJvcmRlci13aGl0ZS82MCBweC0yIHB5LTEgcm91bmRlZC1mdWxsXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpY29uaWZ5IHRleHQtWzE0cHhdIHRleHQtWyNFOTE5MjddXCIgZGF0YS1pY29uPVwibWRpOmZpcmVcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAg6auY6aKR6ICD54K5IOecgeaXtuecgeWKm1xuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgPHNlY3Rpb24gY2xhc3M9XCJiZy13aGl0ZSByb3VuZGVkLTJ4bCBwLTQgc2hhZG93LXNtIGJvcmRlciBib3JkZXItZ3JheS0xMDBcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtWzE0cHhdIGZvbnQtYmxhY2sgdGV4dC1ncmF5LTkwMCBtYi0zXCI+5Yqf6IO95Lqu54K5PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleCBpdGVtcy1zdGFydCBnYXAtMiBiZy1ibHVlLTUwIHJvdW5kZWQteGwgcC0zIGJvcmRlciBib3JkZXItYmx1ZS0xMDBcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaWNvbmlmeSB0ZXh0LVsxOHB4XSB0ZXh0LVsjMEI2M0Y2XSBtdC0wLjVcIiBkYXRhLWljb249XCJtZGk6Y2hlY2stY2lyY2xlLW91dGxpbmVcIj48L3NwYW4+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1bMTJweF0gdGV4dC1ncmF5LTgwMCBmb250LWJvbGQgbGVhZGluZy1yZWxheGVkXCI+MjAw6aKY6auY6aKR6ICD54K56KaG55uW77ya6ZuG5Lit5a2m5Lmg5pyA5qC45b+D44CB5pyA5bi46ICD55qE6ICD54K577yM5ouS57ud5peg5pWI5Yi36aKY44CCPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZsZXggaXRlbXMtc3RhcnQgZ2FwLTIgYmctb3JhbmdlLTUwIHJvdW5kZWQteGwgcC0zIGJvcmRlciBib3JkZXItb3JhbmdlLTEwMFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpY29uaWZ5IHRleHQtWzE4cHhdIHRleHQtWyNGRjZCMDBdIG10LTAuNVwiIGRhdGEtaWNvbj1cIm1kaTpsaWdodGJ1bGItb24tb3V0bGluZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LVsxMnB4XSB0ZXh0LWdyYXktODAwIGZvbnQtYm9sZCBsZWFkaW5nLXJlbGF4ZWRcIj7mioDlt6flrabkuaDmm7Tpq5jmlYjvvJrmr4/kuIDpopjphY3mnInni6zlrrbmioDlt6forrLop6PvvIzovbvmnb7nkIbop6PjgII8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgPC9tYWluPlxuXG4gICAgPGRpdiBjbGFzcz1cImFic29sdXRlIGxlZnQtMCByaWdodC0wIGJvdHRvbS0wIGJnLXdoaXRlLzk1IGJhY2tkcm9wLWJsdXIgYm9yZGVyLXQgYm9yZGVyLWdyYXktMTAwIHB4LTQgcHktM1wiPlxuICAgICAgPGJ1dHRvblxuICAgICAgICBjbGFzcz1cInctZnVsbCBweS0zIHJvdW5kZWQtMnhsIGJnLVsjRTkxOTI3XSB0ZXh0LXdoaXRlIGZvbnQtYmxhY2sgdGV4dC1zbSBzaGFkb3ctc20gYWN0aXZlOnNjYWxlLTk1IHRyYW5zaXRpb24tdHJhbnNmb3JtXCJcbiAgICAgICAgQGNsaWNrPVwic3RhcnRcIlxuICAgICAgPlxuICAgICAgICDnq4vljbPop6PplIHpgJ/miJAyMDDpophcbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBzY29wZWQ+XG46Oi13ZWJraXQtc2Nyb2xsYmFyIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cbjwvc3R5bGU+XG4iXSwiZmlsZSI6IkM6L1VzZXJzL3FubS02L0Rlc2t0b3AvdHJhZV9wcm9qZWN0cy90cmFlX3Byb2plY3RzL3NyYy9wYWdlcy9mYXN0NTAwL0Zhc3Q1MDAudnVlIn0=