var hljs = new function() {
  function e(e) {
    return e.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;")
  }

  function t(e) {
    return e.nodeName.toLowerCase()
  }

  function r(e, t) {
    var r = e && e.exec(t);
    return r && 0 == r.index
  }

  function n(e) {
    return Array.prototype.map.call(e.childNodes, function(e) {
      return 3 == e.nodeType ? N.useBR ? e.nodeValue.replace(/\n/g, "") : e.nodeValue : "br" == t(e) ? "\n" : n(e)
    }).join("")
  }

  function a(e) {
    var t = (e.className + " " + (e.parentNode ? e.parentNode.className : "")).split(/\s+/);
    return t = t.map(function(e) {
      return e.replace(/^language-/, "")
    }), t.filter(function(e) {
      return m(e) || "no-highlight" == e
    })[0]
  }

  function i(e, t) {
    var r = {};
    for (var n in e) r[n] = e[n];
    if (t)
      for (var n in t) r[n] = t[n];
    return r
  }

  function c(e) {
    var r = [];
    return function n(e, a) {
      for (var i = e.firstChild; i; i = i.nextSibling) 3 == i.nodeType ? a += i.nodeValue.length : "br" == t(i) ? a += 1 : 1 == i.nodeType && (r.push({
        event: "start",
        offset: a,
        node: i
      }), a = n(i, a), r.push({
        event: "stop",
        offset: a,
        node: i
      }));
      return a
    }(e, 0), r
  }

  function s(r, n, a) {
    function i() {
      return r.length && n.length ? r[0].offset != n[0].offset ? r[0].offset < n[0].offset ? r : n : "start" == n[0].event ? r : n : r.length ? r : n
    }

    function c(r) {
      function n(t) {
        return " " + t.nodeName + '="' + e(t.value) + '"'
      }
      u += "<" + t(r) + Array.prototype.map.call(r.attributes, n).join("") + ">"
    }

    function s(e) {
      u += "</" + t(e) + ">"
    }

    function o(e) {
      ("start" == e.event ? c : s)(e.node)
    }
    for (var l = 0, u = "", b = []; r.length || n.length;) {
      var d = i();
      if (u += e(a.substr(l, d[0].offset - l)), l = d[0].offset, d == r) {
        b.reverse().forEach(s);
        do o(d.splice(0, 1)[0]), d = i(); while (d == r && d.length && d[0].offset == l);
        b.reverse().forEach(c)
      } else "start" == d[0].event ? b.push(d[0].node) : b.pop(), o(d.splice(0, 1)[0])
    }
    return u + e(a.substr(l))
  }

  function o(e) {
    function t(e) {
      return e && e.source || e
    }

    function r(r, n) {
      return RegExp(t(r), "m" + (e.cI ? "i" : "") + (n ? "g" : ""))
    }

    function n(a, c) {
      function s(t, r) {
        e.cI && (r = r.toLowerCase()), r.split(" ").forEach(function(e) {
          var r = e.split("|");
          o[r[0]] = [t, r[1] ? Number(r[1]) : 1]
        })
      }
      if (!a.compiled) {
        if (a.compiled = !0, a.k = a.k || a.bK, a.k) {
          var o = {};
          "string" == typeof a.k ? s("keyword", a.k) : Object.keys(a.k).forEach(function(e) {
            s(e, a.k[e])
          }), a.k = o
        }
        a.lR = r(a.l || /\b[A-Za-z0-9_]+\b/, !0), c && (a.bK && (a.b = a.bK.split(" ").join("|")), a.b || (a.b = /\B|\b/), a.bR = r(a.b), a.e || a.eW || (a.e = /\B|\b/), a.e && (a.eR = r(a.e)), a.tE = t(a.e) || "", a.eW && c.tE && (a.tE += (a.e ? "|" : "") + c.tE)), a.i && (a.iR = r(a.i)), void 0 === a.r && (a.r = 1), a.c || (a.c = []);
        var l = [];
        a.c.forEach(function(e) {
          e.v ? e.v.forEach(function(t) {
            l.push(i(e, t))
          }) : l.push("self" == e ? a : e)
        }), a.c = l, a.c.forEach(function(e) {
          n(e, a)
        }), a.starts && n(a.starts, c);
        var u = a.c.map(function(e) {
          return e.bK ? "\\.?\\b(" + e.b + ")\\b\\.?" : e.b
        }).concat([a.tE]).concat([a.i]).map(t).filter(Boolean);
        a.t = u.length ? r(u.join("|"), !0) : {
          exec: function() {
            return null
          }
        }, a.continuation = {}
      }
    }
    n(e)
  }

  function l(t, n, a, i) {
    function c(e, t) {
      for (var n = 0; n < t.c.length; n++)
        if (r(t.c[n].bR, e)) return t.c[n]
    }

    function s(e, t) {
      return r(e.eR, t) ? e : e.eW ? s(e.parent, t) : void 0
    }

    function b(e, t) {
      return !a && r(t.iR, e)
    }

    function d(e, t) {
      var r = _.cI ? t[0].toLowerCase() : t[0];
      return e.k.hasOwnProperty(r) && e.k[r]
    }

    function p(e, t, r, n) {
      var a = n ? "" : N.classPrefix,
        i = '<span class="' + a,
        c = r ? "" : "</span>";
      return i += e + '">', i + t + c
    }

    function g() {
      var t = e(L);
      if (!k.k) return t;
      var r = "",
        n = 0;
      k.lR.lastIndex = 0;
      for (var a = k.lR.exec(t); a;) {
        r += t.substr(n, a.index - n);
        var i = d(k, a);
        i ? (C += i[1], r += p(i[0], a[0])) : r += a[0], n = k.lR.lastIndex, a = k.lR.exec(t)
      }
      return r + t.substr(n)
    }

    function f() {
      if (k.sL && !v[k.sL]) return e(L);
      var t = k.sL ? l(k.sL, L, !0, k.continuation.top) : u(L);
      return k.r > 0 && (C += t.r), "continuous" == k.subLanguageMode && (k.continuation.top = t.top), p(t.language, t.value, !1, !0)
    }

    function h() {
      return void 0 !== k.sL ? f() : g()
    }

    function w(t, r) {
      var n = t.cN ? p(t.cN, "", !0) : "";
      t.rB ? (x += n, L = "") : t.eB ? (x += e(r) + n, L = "") : (x += n, L = r), k = Object.create(t, {
        parent: {
          value: k
        }
      })
    }

    function y(t, r) {
      if (L += t, void 0 === r) return x += h(), 0;
      var n = c(r, k);
      if (n) return x += h(), w(n, r), n.rB ? 0 : r.length;
      var a = s(k, r);
      if (a) {
        var i = k;
        i.rE || i.eE || (L += r), x += h();
        do k.cN && (x += "</span>"), C += k.r, k = k.parent; while (k != a.parent);
        return i.eE && (x += e(r)), L = "", a.starts && w(a.starts, ""), i.rE ? 0 : r.length
      }
      if (b(r, k)) throw new Error('Illegal lexeme "' + r + '" for mode "' + (k.cN || "<unnamed>") + '"');
      return L += r, r.length || 1
    }
    var _ = m(t);
    if (!_) throw new Error('Unknown language: "' + t + '"');
    o(_);
    for (var k = i || _, x = "", M = k; M != _; M = M.parent) M.cN && (x = p(M.cN, x, !0));
    var L = "",
      C = 0;
    try {
      for (var E, B, I = 0;;) {
        if (k.t.lastIndex = I, E = k.t.exec(n), !E) break;
        B = y(n.substr(I, E.index - I), E[0]), I = E.index + B
      }
      y(n.substr(I));
      for (var M = k; M.parent; M = M.parent) M.cN && (x += "</span>");
      return {
        r: C,
        value: x,
        language: t,
        top: k
      }
    } catch (S) {
      if (-1 != S.message.indexOf("Illegal")) return {
        r: 0,
        value: e(n)
      };
      throw S
    }
  }

  function u(t, r) {
    r = r || N.languages || Object.keys(v);
    var n = {
        r: 0,
        value: e(t)
      },
      a = n;
    return r.forEach(function(e) {
      if (m(e)) {
        var r = l(e, t, !1);
        r.language = e, r.r > a.r && (a = r), r.r > n.r && (a = n, n = r)
      }
    }), a.language && (n.second_best = a), n
  }

  function b(e) {
    return N.tabReplace && (e = e.replace(/^((<[^>]+>|\t)+)/gm, function(e, t) {
      return t.replace(/\t/g, N.tabReplace)
    })), N.useBR && (e = e.replace(/\n/g, "<br>")), e
  }

  function d(e) {
    var t = n(e),
      r = a(e);
    if ("no-highlight" != r) {
      var i = r ? l(r, t, !0) : u(t),
        o = c(e);
      if (o.length) {
        var d = document.createElementNS("http://www.w3.org/1999/xhtml", "pre");
        d.innerHTML = i.value, i.value = s(o, c(d), t)
      }
      i.value = b(i.value), e.innerHTML = i.value, e.className += " hljs " + (!r && i.language || ""), e.result = {
        language: i.language,
        re: i.r
      }, i.second_best && (e.second_best = {
        language: i.second_best.language,
        re: i.second_best.r
      })
    }
  }

  function p(e) {
    N = i(N, e)
  }

  function g() {
    if (!g.called) {
      g.called = !0;
      var e = document.querySelectorAll("pre code");
      Array.prototype.forEach.call(e, d)
    }
  }

  function f() {
    addEventListener("DOMContentLoaded", g, !1), addEventListener("load", g, !1)
  }

  function h(e, t) {
    var r = v[e] = t(this);
    r.aliases && r.aliases.forEach(function(t) {
      w[t] = e
    })
  }

  function m(e) {
    return v[e] || v[w[e]]
  }
  var N = {
      classPrefix: "hljs-",
      tabReplace: null,
      useBR: !1,
      languages: void 0
    },
    v = {},
    w = {};
  this.highlight = l, this.highlightAuto = u, this.fixMarkup = b, this.highlightBlock = d, this.configure = p, this.initHighlighting = g, this.initHighlightingOnLoad = f, this.registerLanguage = h, this.getLanguage = m, this.inherit = i, this.IR = "[a-zA-Z][a-zA-Z0-9_]*", this.UIR = "[a-zA-Z_][a-zA-Z0-9_]*", this.NR = "\\b\\d+(\\.\\d+)?", this.CNR = "(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", this.BNR = "\\b(0b[01]+)", this.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", this.BE = {
    b: "\\\\[\\s\\S]",
    r: 0
  }, this.ASM = {
    cN: "string",
    b: "'",
    e: "'",
    i: "\\n",
    c: [this.BE]
  }, this.QSM = {
    cN: "string",
    b: '"',
    e: '"',
    i: "\\n",
    c: [this.BE]
  }, this.CLCM = {
    cN: "comment",
    b: "//",
    e: "$"
  }, this.CBLCLM = {
    cN: "comment",
    b: "/\\*",
    e: "\\*/"
  }, this.HCM = {
    cN: "comment",
    b: "#",
    e: "$"
  }, this.NM = {
    cN: "number",
    b: this.NR,
    r: 0
  }, this.CNM = {
    cN: "number",
    b: this.CNR,
    r: 0
  }, this.BNM = {
    cN: "number",
    b: this.BNR,
    r: 0
  }, this.REGEXP_MODE = {
    cN: "regexp",
    b: /\//,
    e: /\/[gim]*/,
    i: /\n/,
    c: [this.BE, {
      b: /\[/,
      e: /\]/,
      r: 0,
      c: [this.BE]
    }]
  }, this.TM = {
    cN: "title",
    b: this.IR,
    r: 0
  }, this.UTM = {
    cN: "title",
    b: this.UIR,
    r: 0
  }
};
hljs.registerLanguage("bash", function(e) {
  var t = {
      cN: "variable",
      v: [{
        b: /\$[\w\d#@][\w\d_]*/
      }, {
        b: /\$\{(.*?)\}/
      }]
    },
    r = {
      cN: "string",
      b: /"/,
      e: /"/,
      c: [e.BE, t, {
        cN: "variable",
        b: /\$\(/,
        e: /\)/,
        c: [e.BE]
      }]
    },
    n = {
      cN: "string",
      b: /'/,
      e: /'/
    };
  return {
    l: /-?[a-z\.]+/,
    k: {
      keyword: "if then else elif fi for break continue while in do done exit return set declare case esac export exec",
      literal: "true false",
      built_in: "printf echo read cd pwd pushd popd dirs let eval unset typeset readonly getopts source shopt caller type hash bind help sudo",
      operator: "-ne -eq -lt -gt -f -d -e -s -l -a"
    },
    c: [{
        cN: "shebang",
        b: /^#![^\n]+sh\s*$/,
        r: 10
      }, {
        cN: "function",
        b: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
        rB: !0,
        c: [e.inherit(e.TM, {
          b: /\w[\w\d_]*/
        })],
        r: 0
      },
      e.HCM, e.NM, r, n, t
    ]
  }
}), hljs.registerLanguage("cs", function(e) {
  var t = "abstract as base bool break byte case catch char checked const continue decimal default delegate do double else enum event explicit extern false finally fixed float for foreach goto if implicit in int interface internal is lock long new null object operator out override params private protected public readonly ref return sbyte sealed short sizeof stackalloc static string struct switch this throw true try typeof uint ulong unchecked unsafe ushort using virtual volatile void while async await ascending descending from get group into join let orderby partial select set value var where yield";
  return {
    k: t,
    c: [{
        cN: "comment",
        b: "///",
        e: "$",
        rB: !0,
        c: [{
          cN: "xmlDocTag",
          b: "///|<!--|-->"
        }, {
          cN: "xmlDocTag",
          b: "</?",
          e: ">"
        }]
      },
      e.CLCM, e.CBLCLM, {
        cN: "preprocessor",
        b: "#",
        e: "$",
        k: "if else elif endif define undef warning error line region endregion pragma checksum"
      }, {
        cN: "string",
        b: '@"',
        e: '"',
        c: [{
          b: '""'
        }]
      },
      e.ASM, e.QSM, e.CNM, {
        bK: "protected public private internal",
        e: /[{;=]/,
        k: t,
        c: [{
          bK: "class namespace interface",
          starts: {
            c: [e.TM]
          }
        }, {
          b: e.IR + "\\s*\\(",
          rB: !0,
          c: [e.TM]
        }]
      }
    ]
  }
}), hljs.registerLanguage("ruby", function(e) {
  var t = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",
    r = "and false then defined module in return redo if BEGIN retry end for true self when next until do begin unless END rescue nil else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor",
    n = {
      cN: "yardoctag",
      b: "@[A-Za-z]+"
    },
    a = {
      cN: "comment",
      v: [{
        b: "#",
        e: "$",
        c: [n]
      }, {
        b: "^\\=begin",
        e: "^\\=end",
        c: [n],
        r: 10
      }, {
        b: "^__END__",
        e: "\\n$"
      }]
    },
    i = {
      cN: "subst",
      b: "#\\{",
      e: "}",
      k: r
    },
    c = {
      cN: "string",
      c: [e.BE, i],
      v: [{
        b: /'/,
        e: /'/
      }, {
        b: /"/,
        e: /"/
      }, {
        b: "%[qw]?\\(",
        e: "\\)"
      }, {
        b: "%[qw]?\\[",
        e: "\\]"
      }, {
        b: "%[qw]?{",
        e: "}"
      }, {
        b: "%[qw]?<",
        e: ">",
        r: 10
      }, {
        b: "%[qw]?/",
        e: "/",
        r: 10
      }, {
        b: "%[qw]?%",
        e: "%",
        r: 10
      }, {
        b: "%[qw]?-",
        e: "-",
        r: 10
      }, {
        b: "%[qw]?\\|",
        e: "\\|",
        r: 10
      }, {
        b: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/
      }]
    },
    s = {
      cN: "params",
      b: "\\(",
      e: "\\)",
      k: r
    },
    o = [c, a, {
      cN: "class",
      bK: "class module",
      e: "$|;",
      i: /=/,
      c: [e.inherit(e.TM, {
          b: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"
        }), {
          cN: "inheritance",
          b: "<\\s*",
          c: [{
            cN: "parent",
            b: "(" + e.IR + "::)?" + e.IR
          }]
        },
        a
      ]
    }, {
      cN: "function",
      bK: "def",
      e: " |$|;",
      r: 0,
      c: [e.inherit(e.TM, {
        b: t
      }), s, a]
    }, {
      cN: "constant",
      b: "(::)?(\\b[A-Z]\\w*(::)?)+",
      r: 0
    }, {
      cN: "symbol",
      b: ":",
      c: [c, {
        b: t
      }],
      r: 0
    }, {
      cN: "symbol",
      b: e.UIR + "(\\!|\\?)?:",
      r: 0
    }, {
      cN: "number",
      b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
      r: 0
    }, {
      cN: "variable",
      b: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))"
    }, {
      b: "(" + e.RSR + ")\\s*",
      c: [a, {
        cN: "regexp",
        c: [e.BE, i],
        i: /\n/,
        v: [{
          b: "/",
          e: "/[a-z]*"
        }, {
          b: "%r{",
          e: "}[a-z]*"
        }, {
          b: "%r\\(",
          e: "\\)[a-z]*"
        }, {
          b: "%r!",
          e: "![a-z]*"
        }, {
          b: "%r\\[",
          e: "\\][a-z]*"
        }]
      }],
      r: 0
    }];
  return i.c = o, s.c = o, {
    k: r,
    c: o
  }
}), hljs.registerLanguage("diff", function() {
  return {
    c: [{
      cN: "chunk",
      r: 10,
      v: [{
        b: /^\@\@ +\-\d+,\d+ +\+\d+,\d+ +\@\@$/
      }, {
        b: /^\*\*\* +\d+,\d+ +\*\*\*\*$/
      }, {
        b: /^\-\-\- +\d+,\d+ +\-\-\-\-$/
      }]
    }, {
      cN: "header",
      v: [{
        b: /Index: /,
        e: /$/
      }, {
        b: /=====/,
        e: /=====$/
      }, {
        b: /^\-\-\-/,
        e: /$/
      }, {
        b: /^\*{3} /,
        e: /$/
      }, {
        b: /^\+\+\+/,
        e: /$/
      }, {
        b: /\*{5}/,
        e: /\*{5}$/
      }]
    }, {
      cN: "addition",
      b: "^\\+",
      e: "$"
    }, {
      cN: "deletion",
      b: "^\\-",
      e: "$"
    }, {
      cN: "change",
      b: "^\\!",
      e: "$"
    }]
  }
}), hljs.registerLanguage("javascript", function(e) {
  return {
    aliases: ["js"],
    k: {
      keyword: "in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const class",
      literal: "true false null undefined NaN Infinity",
      built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require"
    },
    c: [{
        cN: "pi",
        b: /^\s*('|")use strict('|")/,
        r: 10
      },
      e.ASM, e.QSM, e.CLCM, e.CBLCLM, e.CNM, {
        b: "(" + e.RSR + "|\\b(case|return|throw)\\b)\\s*",
        k: "return throw case",
        c: [e.CLCM, e.CBLCLM, e.REGEXP_MODE, {
          b: /</,
          e: />;/,
          r: 0,
          sL: "xml"
        }],
        r: 0
      }, {
        cN: "function",
        bK: "function",
        e: /\{/,
        c: [e.inherit(e.TM, {
          b: /[A-Za-z$_][0-9A-Za-z$_]*/
        }), {
          cN: "params",
          b: /\(/,
          e: /\)/,
          c: [e.CLCM, e.CBLCLM],
          i: /["'\(]/
        }],
        i: /\[|%/
      }, {
        b: /\$[(.]/
      }, {
        b: "\\." + e.IR,
        r: 0
      }
    ]
  }
}), hljs.registerLanguage("xml", function() {
  var e = "[A-Za-z0-9\\._:-]+",
    t = {
      b: /<\?(php)?(?!\w)/,
      e: /\?>/,
      sL: "php",
      subLanguageMode: "continuous"
    },
    r = {
      eW: !0,
      i: /</,
      r: 0,
      c: [t, {
        cN: "attribute",
        b: e,
        r: 0
      }, {
        b: "=",
        r: 0,
        c: [{
          cN: "value",
          v: [{
            b: /"/,
            e: /"/
          }, {
            b: /'/,
            e: /'/
          }, {
            b: /[^\s\/>]+/
          }]
        }]
      }]
    };
  return {
    aliases: ["html"],
    cI: !0,
    c: [{
        cN: "doctype",
        b: "<!DOCTYPE",
        e: ">",
        r: 10,
        c: [{
          b: "\\[",
          e: "\\]"
        }]
      }, {
        cN: "comment",
        b: "<!--",
        e: "-->",
        r: 10
      }, {
        cN: "cdata",
        b: "<\\!\\[CDATA\\[",
        e: "\\]\\]>",
        r: 10
      }, {
        cN: "tag",
        b: "<style(?=\\s|>|$)",
        e: ">",
        k: {
          title: "style"
        },
        c: [r],
        starts: {
          e: "</style>",
          rE: !0,
          sL: "css"
        }
      }, {
        cN: "tag",
        b: "<script(?=\\s|>|$)",
        e: ">",
        k: {
          title: "script"
        },
        c: [r],
        starts: {
          e: "</script>",
          rE: !0,
          sL: "javascript"
        }
      }, {
        b: "<%",
        e: "%>",
        sL: "vbscript"
      },
      t, {
        cN: "pi",
        b: /<\?\w+/,
        e: /\?>/,
        r: 10
      }, {
        cN: "tag",
        b: "</?",
        e: "/?>",
        c: [{
            cN: "title",
            b: "[^ /><]+",
            r: 0
          },
          r
        ]
      }
    ]
  }
}), hljs.registerLanguage("markdown", function() {
  return {
    c: [{
      cN: "header",
      v: [{
        b: "^#{1,6}",
        e: "$"
      }, {
        b: "^.+?\\n[=-]{2,}$"
      }]
    }, {
      b: "<",
      e: ">",
      sL: "xml",
      r: 0
    }, {
      cN: "bullet",
      b: "^([*+-]|(\\d+\\.))\\s+"
    }, {
      cN: "strong",
      b: "[*_]{2}.+?[*_]{2}"
    }, {
      cN: "emphasis",
      v: [{
        b: "\\*.+?\\*"
      }, {
        b: "_.+?_",
        r: 0
      }]
    }, {
      cN: "blockquote",
      b: "^>\\s+",
      e: "$"
    }, {
      cN: "code",
      v: [{
        b: "`.+?`"
      }, {
        b: "^( {4}|	)",
        e: "$",
        r: 0
      }]
    }, {
      cN: "horizontal_rule",
      b: "^[-\\*]{3,}",
      e: "$"
    }, {
      b: "\\[.+?\\][\\(\\[].+?[\\)\\]]",
      rB: !0,
      c: [{
        cN: "link_label",
        b: "\\[",
        e: "\\]",
        eB: !0,
        rE: !0,
        r: 0
      }, {
        cN: "link_url",
        b: "\\]\\(",
        e: "\\)",
        eB: !0,
        eE: !0
      }, {
        cN: "link_reference",
        b: "\\]\\[",
        e: "\\]",
        eB: !0,
        eE: !0
      }],
      r: 10
    }, {
      b: "^\\[.+\\]:",
      e: "$",
      rB: !0,
      c: [{
        cN: "link_reference",
        b: "\\[",
        e: "\\]",
        eB: !0,
        eE: !0
      }, {
        cN: "link_url",
        b: "\\s",
        e: "$"
      }]
    }]
  }
}), hljs.registerLanguage("css", function(e) {
  var t = "[a-zA-Z-][a-zA-Z0-9_-]*",
    r = {
      cN: "function",
      b: t + "\\(",
      e: "\\)",
      c: ["self", e.NM, e.ASM, e.QSM]
    };
  return {
    cI: !0,
    i: "[=/|']",
    c: [e.CBLCLM, {
      cN: "id",
      b: "\\#[A-Za-z0-9_-]+"
    }, {
      cN: "class",
      b: "\\.[A-Za-z0-9_-]+",
      r: 0
    }, {
      cN: "attr_selector",
      b: "\\[",
      e: "\\]",
      i: "$"
    }, {
      cN: "pseudo",
      b: ":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+"
    }, {
      cN: "at_rule",
      b: "@(font-face|page)",
      l: "[a-z-]+",
      k: "font-face page"
    }, {
      cN: "at_rule",
      b: "@",
      e: "[{;]",
      c: [{
        cN: "keyword",
        b: /\S+/
      }, {
        b: /\s/,
        eW: !0,
        eE: !0,
        r: 0,
        c: [r, e.ASM, e.QSM, e.NM]
      }]
    }, {
      cN: "tag",
      b: t,
      r: 0
    }, {
      cN: "rules",
      b: "{",
      e: "}",
      i: "[^\\s]",
      r: 0,
      c: [e.CBLCLM, {
        cN: "rule",
        b: "[^\\s]",
        rB: !0,
        e: ";",
        eW: !0,
        c: [{
          cN: "attribute",
          b: "[A-Z\\_\\.\\-]+",
          e: ":",
          eE: !0,
          i: "[^\\s]",
          starts: {
            cN: "value",
            eW: !0,
            eE: !0,
            c: [r, e.NM, e.QSM, e.ASM, e.CBLCLM, {
              cN: "hexcolor",
              b: "#[0-9A-Fa-f]+"
            }, {
              cN: "important",
              b: "!important"
            }]
          }
        }]
      }]
    }]
  }
}), hljs.registerLanguage("http", function() {
  return {
    i: "\\S",
    c: [{
      cN: "status",
      b: "^HTTP/[0-9\\.]+",
      e: "$",
      c: [{
        cN: "number",
        b: "\\b\\d{3}\\b"
      }]
    }, {
      cN: "request",
      b: "^[A-Z]+ (.*?) HTTP/[0-9\\.]+$",
      rB: !0,
      e: "$",
      c: [{
        cN: "string",
        b: " ",
        e: " ",
        eB: !0,
        eE: !0
      }]
    }, {
      cN: "attribute",
      b: "^\\w",
      e: ": ",
      eE: !0,
      i: "\\n|\\s|=",
      starts: {
        cN: "string",
        e: "$"
      }
    }, {
      b: "\\n\\n",
      starts: {
        sL: "",
        eW: !0
      }
    }]
  }
}), hljs.registerLanguage("java", function(e) {
  var t = "false synchronized int abstract float private char boolean static null if const for true while long throw strictfp finally protected import native final return void enum else break transient new catch instanceof byte super volatile case assert short package default double public try this switch continue throws";
  return {
    k: t,
    i: /<\//,
    c: [{
        cN: "javadoc",
        b: "/\\*\\*",
        e: "\\*/",
        c: [{
          cN: "javadoctag",
          b: "(^|\\s)@[A-Za-z]+"
        }],
        r: 10
      },
      e.CLCM, e.CBLCLM, e.ASM, e.QSM, {
        bK: "protected public private",
        e: /[{;=]/,
        k: t,
        c: [{
          cN: "class",
          bK: "class interface",
          eW: !0,
          i: /[:"<>]/,
          c: [{
              bK: "extends implements",
              r: 10
            },
            e.UTM
          ]
        }, {
          b: e.UIR + "\\s*\\(",
          rB: !0,
          c: [e.UTM]
        }]
      },
      e.CNM, {
        cN: "annotation",
        b: "@[A-Za-z]+"
      }
    ]
  }
}), hljs.registerLanguage("php", function(e) {
  var t = {
      cN: "variable",
      b: "\\$+[a-zA-Z_-ÿ][a-zA-Z0-9_-ÿ]*"
    },
    r = {
      cN: "preprocessor",
      b: /<\?(php)?|\?>/
    },
    n = {
      cN: "string",
      c: [e.BE, r],
      v: [{
          b: 'b"',
          e: '"'
        }, {
          b: "b'",
          e: "'"
        },
        e.inherit(e.ASM, {
          i: null
        }), e.inherit(e.QSM, {
          i: null
        })
      ]
    },
    a = {
      v: [e.BNM, e.CNM]
    };
  return {
    cI: !0,
    k: "and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",
    c: [e.CLCM, e.HCM, {
        cN: "comment",
        b: "/\\*",
        e: "\\*/",
        c: [{
            cN: "phpdoc",
            b: "\\s@[A-Za-z]+"
          },
          r
        ]
      }, {
        cN: "comment",
        b: "__halt_compiler.+?;",
        eW: !0,
        k: "__halt_compiler",
        l: e.UIR
      }, {
        cN: "string",
        b: "<<<['\"]?\\w+['\"]?$",
        e: "^\\w+;",
        c: [e.BE]
      },
      r, t, {
        cN: "function",
        bK: "function",
        e: /[;{]/,
        i: "\\$|\\[|%",
        c: [e.UTM, {
          cN: "params",
          b: "\\(",
          e: "\\)",
          c: ["self", t, e.CBLCLM, n, a]
        }]
      }, {
        cN: "class",
        bK: "class interface",
        e: "{",
        i: /[:\(\$"]/,
        c: [{
            bK: "extends implements",
            r: 10
          },
          e.UTM
        ]
      }, {
        bK: "namespace",
        e: ";",
        i: /[\.']/,
        c: [e.UTM]
      }, {
        bK: "use",
        e: ";",
        c: [e.UTM]
      }, {
        b: "=>"
      },
      n, a
    ]
  }
}), hljs.registerLanguage("python", function(e) {
  var t = {
      cN: "prompt",
      b: /^(>>>|\.\.\.) /
    },
    r = {
      cN: "string",
      c: [e.BE],
      v: [{
          b: /(u|b)?r?'''/,
          e: /'''/,
          c: [t],
          r: 10
        }, {
          b: /(u|b)?r?"""/,
          e: /"""/,
          c: [t],
          r: 10
        }, {
          b: /(u|r|ur)'/,
          e: /'/,
          r: 10
        }, {
          b: /(u|r|ur)"/,
          e: /"/,
          r: 10
        }, {
          b: /(b|br)'/,
          e: /'/
        }, {
          b: /(b|br)"/,
          e: /"/
        },
        e.ASM, e.QSM
      ]
    },
    n = {
      cN: "number",
      r: 0,
      v: [{
        b: e.BNR + "[lLjJ]?"
      }, {
        b: "\\b(0o[0-7]+)[lLjJ]?"
      }, {
        b: e.CNR + "[lLjJ]?"
      }]
    },
    a = {
      cN: "params",
      b: /\(/,
      e: /\)/,
      c: ["self", t, n, r]
    },
    i = {
      e: /:/,
      i: /[${=;\n]/,
      c: [e.UTM, a]
    };
  return {
    k: {
      keyword: "and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda nonlocal|10 None True False",
      built_in: "Ellipsis NotImplemented"
    },
    i: /(<\/|->|\?)/,
    c: [t, n, r, e.HCM, e.inherit(i, {
      cN: "function",
      bK: "def",
      r: 10
    }), e.inherit(i, {
      cN: "class",
      bK: "class"
    }), {
      cN: "decorator",
      b: /@/,
      e: /$/
    }, {
      b: /\b(print|exec)\(/
    }]
  }
}), hljs.registerLanguage("sql", function(e) {
  return {
    cI: !0,
    i: /[<>]/,
    c: [{
        cN: "operator",
        b: "\\b(begin|end|start|commit|rollback|savepoint|lock|alter|create|drop|rename|call|delete|do|handler|insert|load|replace|select|truncate|update|set|show|pragma|grant|merge)\\b(?!:)",
        e: ";",
        eW: !0,
        k: {
          keyword: "all partial global month current_timestamp using go revoke smallint indicator end-exec disconnect zone with character assertion to add current_user usage input local alter match collate real then rollback get read timestamp session_user not integer bit unique day minute desc insert execute like ilike|2 level decimal drop continue isolation found where constraints domain right national some module transaction relative second connect escape close system_user for deferred section cast current sqlstate allocate intersect deallocate numeric public preserve full goto initially asc no key output collation group by union session both last language constraint column of space foreign deferrable prior connection unknown action commit view or first into float year primary cascaded except restrict set references names table outer open select size are rows from prepare distinct leading create only next inner authorization schema corresponding option declare precision immediate else timezone_minute external varying translation true case exception join hour default double scroll value cursor descriptor values dec fetch procedure delete and false int is describe char as at in varchar null trailing any absolute current_time end grant privileges when cross check write current_date pad begin temporary exec time update catalog user sql date on identity timezone_hour natural whenever interval work order cascade diagnostics nchar having left call do handler load replace truncate start lock show pragma exists number trigger if before after each row merge matched database",
          aggregate: "count sum min max avg"
        },
        c: [{
            cN: "string",
            b: "'",
            e: "'",
            c: [e.BE, {
              b: "''"
            }]
          }, {
            cN: "string",
            b: '"',
            e: '"',
            c: [e.BE, {
              b: '""'
            }]
          }, {
            cN: "string",
            b: "`",
            e: "`",
            c: [e.BE]
          },
          e.CNM
        ]
      },
      e.CBLCLM, {
        cN: "comment",
        b: "--",
        e: "$"
      }
    ]
  }
}), hljs.registerLanguage("handlebars", function() {
  var e = "each in with if else unless bindattr action collection debugger log outlet template unbound view yield";
  return {
    cI: !0,
    sL: "xml",
    subLanguageMode: "continuous",
    c: [{
      cN: "expression",
      b: "{{",
      e: "}}",
      c: [{
        cN: "begin-block",
        b: "#[a-zA-Z- .]+",
        k: e
      }, {
        cN: "string",
        b: '"',
        e: '"'
      }, {
        cN: "end-block",
        b: "\\/[a-zA-Z- .]+",
        k: e
      }, {
        cN: "variable",
        b: "[a-zA-Z-.]+",
        k: e
      }]
    }]
  }
}), hljs.registerLanguage("ini", function(e) {
  return {
    cI: !0,
    i: /\S/,
    c: [{
      cN: "comment",
      b: ";",
      e: "$"
    }, {
      cN: "title",
      b: "^\\[",
      e: "\\]"
    }, {
      cN: "setting",
      b: "^[a-z0-9\\[\\]_-]+[ \\t]*=[ \\t]*",
      e: "$",
      c: [{
        cN: "value",
        eW: !0,
        k: "on off true false yes no",
        c: [e.QSM, e.NM],
        r: 0
      }]
    }]
  }
}), hljs.registerLanguage("vbnet", function(e) {
  return {
    cI: !0,
    k: {
      keyword: "addhandler addressof alias and andalso aggregate ansi as assembly auto binary by byref byval call case catch class compare const continue custom declare default delegate dim distinct do each equals else elseif end enum erase error event exit explicit finally for friend from function get global goto group handles if implements imports in inherits interface into is isfalse isnot istrue join key let lib like loop me mid mod module mustinherit mustoverride mybase myclass namespace narrowing new next not notinheritable notoverridable of off on operator option optional or order orelse overloads overridable overrides paramarray partial preserve private property protected public raiseevent readonly redim rem removehandler resume return select set shadows shared skip static step stop structure strict sub synclock take text then throw to try unicode until using when where while widening with withevents writeonly xor",
      built_in: "boolean byte cbool cbyte cchar cdate cdec cdbl char cint clng cobj csbyte cshort csng cstr ctype date decimal directcast double gettype getxmlnamespace iif integer long object sbyte short single string trycast typeof uinteger ulong ushort",
      literal: "true false nothing"
    },
    i: "//|{|}|endif|gosub|variant|wend",
    c: [e.inherit(e.QSM, {
        c: [{
          b: '""'
        }]
      }), {
        cN: "comment",
        b: "'",
        e: "$",
        rB: !0,
        c: [{
          cN: "xmlDocTag",
          b: "'''|<!--|-->"
        }, {
          cN: "xmlDocTag",
          b: "</?",
          e: ">"
        }]
      },
      e.CNM, {
        cN: "preprocessor",
        b: "#",
        e: "$",
        k: "if else elseif end region externalsource"
      }
    ]
  }
}), hljs.registerLanguage("perl", function(e) {
  var t = "getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when",
    r = {
      cN: "subst",
      b: "[$@]\\{",
      e: "\\}",
      k: t
    },
    n = {
      b: "->{",
      e: "}"
    },
    a = {
      cN: "variable",
      v: [{
        b: /\$\d/
      }, {
        b: /[\$\%\@\*](\^\w\b|#\w+(\:\:\w+)*|{\w+}|\w+(\:\:\w*)*)/
      }, {
        b: /[\$\%\@\*][^\s\w{]/,
        r: 0
      }]
    },
    i = {
      cN: "comment",
      b: "^(__END__|__DATA__)",
      e: "\\n$",
      r: 5
    },
    c = [e.BE, r, a],
    s = [a, e.HCM, i, {
        cN: "comment",
        b: "^\\=\\w",
        e: "\\=cut",
        eW: !0
      },
      n, {
        cN: "string",
        c: c,
        v: [{
          b: "q[qwxr]?\\s*\\(",
          e: "\\)",
          r: 5
        }, {
          b: "q[qwxr]?\\s*\\[",
          e: "\\]",
          r: 5
        }, {
          b: "q[qwxr]?\\s*\\{",
          e: "\\}",
          r: 5
        }, {
          b: "q[qwxr]?\\s*\\|",
          e: "\\|",
          r: 5
        }, {
          b: "q[qwxr]?\\s*\\<",
          e: "\\>",
          r: 5
        }, {
          b: "qw\\s+q",
          e: "q",
          r: 5
        }, {
          b: "'",
          e: "'",
          c: [e.BE]
        }, {
          b: '"',
          e: '"'
        }, {
          b: "`",
          e: "`",
          c: [e.BE]
        }, {
          b: "{\\w+}",
          c: [],
          r: 0
        }, {
          b: "-?\\w+\\s*\\=\\>",
          c: [],
          r: 0
        }]
      }, {
        cN: "number",
        b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
        r: 0
      }, {
        b: "(\\/\\/|" + e.RSR + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
        k: "split return print reverse grep",
        r: 0,
        c: [e.HCM, i, {
          cN: "regexp",
          b: "(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",
          r: 10
        }, {
          cN: "regexp",
          b: "(m|qr)?/",
          e: "/[a-z]*",
          c: [e.BE],
          r: 0
        }]
      }, {
        cN: "sub",
        bK: "sub",
        e: "(\\s*\\(.*?\\))?[;{]",
        r: 5
      }, {
        cN: "operator",
        b: "-\\w\\b",
        r: 0
      }
    ];
  return r.c = s, n.c = s, {
    k: t,
    c: s
  }
}), hljs.registerLanguage("objectivec", function(e) {
  var t = {
      keyword: "int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign self synchronized id nonatomic super unichar IBOutlet IBAction strong weak @private @protected @public @try @property @end @throw @catch @finally @synthesize @dynamic @selector @optional @required",
      literal: "false true FALSE TRUE nil YES NO NULL",
      built_in: "NSString NSDictionary CGRect CGPoint UIButton UILabel UITextView UIWebView MKMapView UISegmentedControl NSObject UITableViewDelegate UITableViewDataSource NSThread UIActivityIndicator UITabbar UIToolBar UIBarButtonItem UIImageView NSAutoreleasePool UITableView BOOL NSInteger CGFloat NSException NSLog NSMutableString NSMutableArray NSMutableDictionary NSURL NSIndexPath CGSize UITableViewCell UIView UIViewController UINavigationBar UINavigationController UITabBarController UIPopoverController UIPopoverControllerDelegate UIImage NSNumber UISearchBar NSFetchedResultsController NSFetchedResultsChangeType UIScrollView UIScrollViewDelegate UIEdgeInsets UIColor UIFont UIApplication NSNotFound NSNotificationCenter NSNotification UILocalNotification NSBundle NSFileManager NSTimeInterval NSDate NSCalendar NSUserDefaults UIWindow NSRange NSArray NSError NSURLRequest NSURLConnection UIInterfaceOrientation MPMoviePlayerController dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"
    },
    r = /[a-zA-Z@][a-zA-Z0-9_]*/,
    n = "@interface @class @protocol @implementation";
  return {
    k: t,
    l: r,
    i: "</",
    c: [e.CLCM, e.CBLCLM, e.CNM, e.QSM, {
      cN: "string",
      b: "'",
      e: "[^\\\\]'",
      i: "[^\\\\][^']"
    }, {
      cN: "preprocessor",
      b: "#import",
      e: "$",
      c: [{
        cN: "title",
        b: '"',
        e: '"'
      }, {
        cN: "title",
        b: "<",
        e: ">"
      }]
    }, {
      cN: "preprocessor",
      b: "#",
      e: "$"
    }, {
      cN: "class",
      b: "(" + n.split(" ").join("|") + ")\\b",
      e: "({|$)",
      k: n,
      l: r,
      c: [e.UTM]
    }, {
      cN: "variable",
      b: "\\." + e.UIR,
      r: 0
    }]
  }
}), hljs.registerLanguage("coffeescript", function(e) {
  var t = {
      keyword: "in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super then unless until loop of by when and or is isnt not",
      literal: "true false null undefined yes no on off",
      reserved: "case default function var void with const let enum export import native __hasProp __extends __slice __bind __indexOf",
      built_in: "npm require console print module exports global window document"
    },
    r = "[A-Za-z$_][0-9A-Za-z$_]*",
    n = e.inherit(e.TM, {
      b: r
    }),
    a = {
      cN: "subst",
      b: /#\{/,
      e: /}/,
      k: t
    },
    i = [e.BNM, e.inherit(e.CNM, {
      starts: {
        e: "(\\s*/)?",
        r: 0
      }
    }), {
      cN: "string",
      v: [{
        b: /'''/,
        e: /'''/,
        c: [e.BE]
      }, {
        b: /'/,
        e: /'/,
        c: [e.BE]
      }, {
        b: /"""/,
        e: /"""/,
        c: [e.BE, a]
      }, {
        b: /"/,
        e: /"/,
        c: [e.BE, a]
      }]
    }, {
      cN: "regexp",
      v: [{
        b: "///",
        e: "///",
        c: [a, e.HCM]
      }, {
        b: "//[gim]*",
        r: 0
      }, {
        b: "/\\S(\\\\.|[^\\n])*?/[gim]*(?=\\s|\\W|$)"
      }]
    }, {
      cN: "property",
      b: "@" + r
    }, {
      b: "`",
      e: "`",
      eB: !0,
      eE: !0,
      sL: "javascript"
    }];
  return a.c = i, {
    k: t,
    c: i.concat([{
        cN: "comment",
        b: "###",
        e: "###"
      },
      e.HCM, {
        cN: "function",
        b: "(" + r + "\\s*=\\s*)?(\\(.*\\))?\\s*\\B[-=]>",
        e: "[-=]>",
        rB: !0,
        c: [n, {
          cN: "params",
          b: "\\(",
          rB: !0,
          c: [{
            b: /\(/,
            e: /\)/,
            k: t,
            c: ["self"].concat(i)
          }]
        }]
      }, {
        cN: "class",
        bK: "class",
        e: "$",
        i: /[:="\[\]]/,
        c: [{
            bK: "extends",
            eW: !0,
            i: /[:="\[\]]/,
            c: [n]
          },
          n
        ]
      }, {
        cN: "attribute",
        b: r + ":",
        e: ":",
        rB: !0,
        eE: !0,
        r: 0
      }
    ])
  }
}), hljs.registerLanguage("nginx", function(e) {
  var t = {
      cN: "variable",
      v: [{
        b: /\$\d+/
      }, {
        b: /\$\{/,
        e: /}/
      }, {
        b: "[\\$\\@]" + e.UIR
      }]
    },
    r = {
      eW: !0,
      l: "[a-z/_]+",
      k: {
        built_in: "on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll"
      },
      r: 0,
      i: "=>",
      c: [e.HCM, {
          cN: "string",
          c: [e.BE, t],
          v: [{
            b: /"/,
            e: /"/
          }, {
            b: /'/,
            e: /'/
          }]
        }, {
          cN: "url",
          b: "([a-z]+):/",
          e: "\\s",
          eW: !0,
          eE: !0
        }, {
          cN: "regexp",
          c: [e.BE, t],
          v: [{
            b: "\\s\\^",
            e: "\\s|{|;",
            rE: !0
          }, {
            b: "~\\*?\\s+",
            e: "\\s|{|;",
            rE: !0
          }, {
            b: "\\*(\\.[a-z\\-]+)+"
          }, {
            b: "([a-z\\-]+\\.)+\\*"
          }]
        }, {
          cN: "number",
          b: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"
        }, {
          cN: "number",
          b: "\\b\\d+[kKmMgGdshdwy]*\\b",
          r: 0
        },
        t
      ]
    };
  return {
    c: [e.HCM, {
      b: e.UIR + "\\s",
      e: ";|{",
      rB: !0,
      c: [e.inherit(e.UTM, {
        starts: r
      })],
      r: 0
    }],
    i: "[^\\s\\}]"
  }
}), hljs.registerLanguage("json", function(e) {
  var t = {
      literal: "true false null"
    },
    r = [e.QSM, e.CNM],
    n = {
      cN: "value",
      e: ",",
      eW: !0,
      eE: !0,
      c: r,
      k: t
    },
    a = {
      b: "{",
      e: "}",
      c: [{
        cN: "attribute",
        b: '\\s*"',
        e: '"\\s*:\\s*',
        eB: !0,
        eE: !0,
        c: [e.BE],
        i: "\\n",
        starts: n
      }],
      i: "\\S"
    },
    i = {
      b: "\\[",
      e: "\\]",
      c: [e.inherit(n, {
        cN: null
      })],
      i: "\\S"
    };
  return r.splice(r.length, 0, a, i), {
    c: r,
    k: t,
    i: "\\S"
  }
}), hljs.registerLanguage("vbscript", function(e) {
  return {
    cI: !0,
    k: {
      keyword: "call class const dim do loop erase execute executeglobal exit for each next function if then else on error option explicit new private property let get public randomize redim rem select case set stop sub while wend with end to elseif is or xor and not class_initialize class_terminate default preserve in me byval byref step resume goto",
      built_in: "lcase month vartype instrrev ubound setlocale getobject rgb getref string weekdayname rnd dateadd monthname now day minute isarray cbool round formatcurrency conversions csng timevalue second year space abs clng timeserial fixs len asc isempty maths dateserial atn timer isobject filter weekday datevalue ccur isdate instr datediff formatdatetime replace isnull right sgn array snumeric log cdbl hex chr lbound msgbox ucase getlocale cos cdate cbyte rtrim join hour oct typename trim strcomp int createobject loadpicture tan formatnumber mid scriptenginebuildversion scriptengine split scriptengineminorversion cint sin datepart ltrim sqr scriptenginemajorversion time derived eval date formatpercent exp inputbox left ascw chrw regexp server response request cstr err",
      literal: "true false null nothing empty"
    },
    i: "//",
    c: [e.inherit(e.QSM, {
        c: [{
          b: '""'
        }]
      }), {
        cN: "comment",
        b: /'/,
        e: /$/,
        r: 0
      },
      e.CNM
    ]
  }
}), hljs.registerLanguage("apache", function(e) {
  var t = {
    cN: "number",
    b: "[\\$%]\\d+"
  };
  return {
    cI: !0,
    c: [e.HCM, {
      cN: "tag",
      b: "</?",
      e: ">"
    }, {
      cN: "keyword",
      b: /\w+/,
      r: 0,
      k: {
        common: "order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"
      },
      starts: {
        e: /$/,
        r: 0,
        k: {
          literal: "on off all"
        },
        c: [{
            cN: "sqbracket",
            b: "\\s\\[",
            e: "\\]$"
          }, {
            cN: "cbracket",
            b: "[\\$%]\\{",
            e: "\\}",
            c: ["self", t]
          },
          t, e.QSM
        ]
      }
    }],
    i: /\S/
  }
}), hljs.registerLanguage("cpp", function(e) {
  var t = {
    keyword: "false int float while private char catch export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace unsigned long throw volatile static protected bool template mutable if public friend do return goto auto void enum else break new extern using true class asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue wchar_t inline delete alignof char16_t char32_t constexpr decltype noexcept nullptr static_assert thread_local restrict _Bool complex _Complex _Imaginary",
    built_in: "std string cin cout cerr clog stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf"
  };
  return {
    aliases: ["c"],
    k: t,
    i: "</",
    c: [e.CLCM, e.CBLCLM, e.QSM, {
        cN: "string",
        b: "'\\\\?.",
        e: "'",
        i: "."
      }, {
        cN: "number",
        b: "\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)"
      },
      e.CNM, {
        cN: "preprocessor",
        b: "#",
        e: "$",
        c: [{
            b: "include\\s*<",
            e: ">",
            i: "\\n"
          },
          e.CLCM
        ]
      }, {
        cN: "stl_container",
        b: "\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
        e: ">",
        k: t,
        r: 10,
        c: ["self"]
      }
    ]
  }
}), hljs.registerLanguage("makefile", function(e) {
  var t = {
    cN: "variable",
    b: /\$\(/,
    e: /\)/,
    c: [e.BE]
  };
  return {
    c: [e.HCM, {
      b: /^\w+\s*\W*=/,
      rB: !0,
      r: 0,
      starts: {
        cN: "constant",
        e: /\s*\W*=/,
        eE: !0,
        starts: {
          e: /$/,
          r: 0,
          c: [t]
        }
      }
    }, {
      cN: "title",
      b: /^[\w]+:\s*$/
    }, {
      cN: "phony",
      b: /^\.PHONY:/,
      e: /$/,
      k: ".PHONY",
      l: /[\.\w]+/
    }, {
      b: /^\t+/,
      e: /$/,
      c: [e.QSM, t]
    }]
  }
}), hljs.registerLanguage("go", function(e) {
  var t = {
    keyword: "break default func interface select case map struct chan else goto package switch const fallthrough if range type continue for import return var go defer",
    constant: "true false iota nil",
    typename: "bool byte complex64 complex128 float32 float64 int8 int16 int32 int64 string uint8 uint16 uint32 uint64 int uint uintptr rune",
    built_in: "append cap close complex copy imag len make new panic print println real recover delete"
  };
  return {
    aliases: ["golang"],
    k: t,
    i: "</",
    c: [e.CLCM, e.CBLCLM, e.QSM, {
        cN: "string",
        b: "'",
        e: "[^\\\\]'"
      }, {
        cN: "string",
        b: "`",
        e: "`"
      }, {
        cN: "number",
        b: "[^a-zA-Z_0-9](\\-|\\+)?\\d+(\\.\\d+|\\/\\d+)?((d|e|f|l|s)(\\+|\\-)?\\d+)?",
        r: 0
      },
      e.CNM
    ]
  }
});