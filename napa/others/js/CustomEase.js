/*!
 * VERSION: 0.2.1
 * DATE: 2017-01-12
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2017, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        _gsScope._gsDefine("easing.CustomEase", ["easing.Ease"], function(e) {
            var o = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
                t = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
                r = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi,
                n = /[cLlsS]/g,
                i = "CustomEase only accepts Cubic Bezier data.",
                s = "codepen",
                a = "CustomEase",
                h = String.fromCharCode(103, 114, 101, 101, 110, 115, 111, 99, 107, 46, 99, 111, 109),
                f = String.fromCharCode(47, 114, 101, 113, 117, 105, 114, 101, 115, 45, 109, 101, 109, 98, 101, 114, 115, 104, 105, 112, 47),
                u = function(e) { return 1;
                    for (var o = -1 !== (window ? window.location.href : "").indexOf(String.fromCharCode(103, 114, 101, 101, 110, 115, 111, 99, 107)) && -1 !== e.indexOf(String.fromCharCode(108, 111, 99, 97, 108, 104, 111, 115, 116)), t = [h, String.fromCharCode(99, 111, 100, 101, 112, 101, 110, 46, 105, 111), String.fromCharCode(99, 111, 100, 101, 112, 101, 110, 46, 100, 101, 118), String.fromCharCode(99, 115, 115, 45, 116, 114, 105, 99, 107, 115, 46, 99, 111, 109), String.fromCharCode(99, 100, 112, 110, 46, 105, 111), String.fromCharCode(103, 97, 110, 110, 111, 110, 46, 116, 118), String.fromCharCode(99, 111, 100, 101, 99, 97, 110, 121, 111, 110, 46, 110, 101, 116), String.fromCharCode(116, 104, 101, 109, 101, 102, 111, 114, 101, 115, 116, 46, 110, 101, 116), String.fromCharCode(99, 101, 114, 101, 98, 114, 97, 120, 46, 99, 111, 46, 117, 107), String.fromCharCode(116, 121, 109, 112, 97, 110, 117, 115, 46, 110, 101, 116), String.fromCharCode(116, 119, 101, 101, 110, 109, 97, 120, 46, 99, 111, 109), String.fromCharCode(116, 119, 101, 101, 110, 108, 105, 116, 101, 46, 99, 111, 109), String.fromCharCode(112, 108, 110, 107, 114, 46, 99, 111), String.fromCharCode(104, 111, 116, 106, 97, 114, 46, 99, 111, 109), String.fromCharCode(119, 101, 98, 112, 97, 99, 107, 98, 105, 110, 46, 99, 111, 109), String.fromCharCode(97, 114, 99, 104, 105, 118, 101, 46, 111, 114, 103), String.fromCharCode(106, 115, 102, 105, 100, 100, 108, 101, 46, 110, 101, 116)], r = t.length; --r > -1;)
                        if (-1 !== e.indexOf(t[r])) return !0;
                    return o && window && window.console && console.log(String.fromCharCode(87, 65, 82, 78, 73, 78, 71, 58, 32, 97, 32, 115, 112, 101, 99, 105, 97, 108, 32, 118, 101, 114, 115, 105, 111, 110, 32, 111, 102, 32) + a + String.fromCharCode(32, 105, 115, 32, 114, 117, 110, 110, 105, 110, 103, 32, 108, 111, 99, 97, 108, 108, 121, 44, 32, 98, 117, 116, 32, 105, 116, 32, 119, 105, 108, 108, 32, 110, 111, 116, 32, 119, 111, 114, 107, 32, 111, 110, 32, 97, 32, 108, 105, 118, 101, 32, 100, 111, 109, 97, 105, 110, 32, 98, 101, 99, 97, 117, 115, 101, 32, 105, 116, 32, 105, 115, 32, 97, 32, 109, 101, 109, 98, 101, 114, 115, 104, 105, 112, 32, 98, 101, 110, 101, 102, 105, 116, 32, 111, 102, 32, 67, 108, 117, 98, 32, 71, 114, 101, 101, 110, 83, 111, 99, 107, 46, 32, 80, 108, 101, 97, 115, 101, 32, 115, 105, 103, 110, 32, 117, 112, 32, 97, 116, 32, 104, 116, 116, 112, 58, 47, 47, 103, 114, 101, 101, 110, 115, 111, 99, 107, 46, 99, 111, 109, 47, 99, 108, 117, 98, 47, 32, 97, 110, 100, 32, 116, 104, 101, 110, 32, 100, 111, 119, 110, 108, 111, 97, 100, 32, 116, 104, 101, 32, 39, 114, 101, 97, 108, 39, 32, 118, 101, 114, 115, 105, 111, 110, 32, 102, 114, 111, 109, 32, 121, 111, 117, 114, 32, 71, 114, 101, 101, 110, 83, 111, 99, 107, 32, 97, 99, 99, 111, 117, 110, 116, 32, 119, 104, 105, 99, 104, 32, 104, 97, 115, 32, 110, 111, 32, 115, 117, 99, 104, 32, 108, 105, 109, 105, 116, 97, 116, 105, 111, 110, 115, 46, 32, 84, 104, 101, 32, 102, 105, 108, 101, 32, 121, 111, 117, 39, 114, 101, 32, 117, 115, 105, 110, 103, 32, 119, 97, 115, 32, 108, 105, 107, 101, 108, 121, 32, 100, 111, 119, 110, 108, 111, 97, 100, 101, 100, 32, 102, 114, 111, 109, 32, 101, 108, 115, 101, 119, 104, 101, 114, 101, 32, 111, 110, 32, 116, 104, 101, 32, 119, 101, 98, 32, 97, 110, 100, 32, 105, 115, 32, 114, 101, 115, 116, 114, 105, 99, 116, 101, 100, 32, 116, 111, 32, 108, 111, 99, 97, 108, 32, 117, 115, 101, 32, 111, 114, 32, 111, 110, 32, 115, 105, 116, 101, 115, 32, 108, 105, 107, 101, 32, 99, 111, 100, 101, 112, 101, 110, 46, 105, 111, 46)), o
                }(window ? window.location.host : ""),
                d = function(e, o, t, r, n, i, s, a, h, f, u) {
                    var g, c = (e + t) / 2,
                        C = (o + r) / 2,
                        l = (t + n) / 2,
                        p = (r + i) / 2,
                        m = (n + s) / 2,
                        S = (i + a) / 2,
                        w = (c + l) / 2,
                        x = (C + p) / 2,
                        y = (l + m) / 2,
                        _ = (p + S) / 2,
                        v = (w + y) / 2,
                        b = (x + _) / 2,
                        M = s - e,
                        q = a - o,
                        D = Math.abs((t - s) * q - (r - a) * M),
                        k = Math.abs((n - s) * q - (i - a) * M);
                    return f || (f = [{
                        x: e,
                        y: o
                    }, {
                        x: s,
                        y: a
                    }], u = 1), f.splice(u || f.length - 1, 0, {
                        x: v,
                        y: b
                    }), (D + k) * (D + k) > h * (M * M + q * q) && (g = f.length, d(e, o, c, C, w, x, v, b, h, f, u), d(v, b, y, _, m, S, s, a, h, f, u + 1 + (f.length - g))), f
                },
                g = function(e) {
                    var o, n, s, a, h, f, u, d, g, c, C, l = (e + "").replace(r, function(e) {
                            var o = +e;
                            return 1e-4 > o && o > -1e-4 ? 0 : o
                        }).match(t) || [],
                        p = [],
                        m = 0,
                        S = 0,
                        w = l.length,
                        x = 2;
                    for (o = 0; w > o; o++)
                        if (g = a, isNaN(l[o]) ? (a = l[o].toUpperCase(), h = a !== l[o]) : o--, n = +l[o + 1], s = +l[o + 2], h && (n += m, s += S), o || (u = n, d = s), "M" === a) f && f.length < 8 && (p.length -= 1, x = 0), m = u = n, S = d = s, f = [n, s], x = 2, p.push(f), o += 2, a = "L";
                        else if ("C" === a) f || (f = [0, 0]), f[x++] = n, f[x++] = s, h || (m = S = 0), f[x++] = m + 1 * l[o + 3], f[x++] = S + 1 * l[o + 4], f[x++] = m += 1 * l[o + 5], f[x++] = S += 1 * l[o + 6], o += 6;
                    else if ("S" === a) "C" === g || "S" === g ? (c = m - f[x - 4], C = S - f[x - 3], f[x++] = m + c, f[x++] = S + C) : (f[x++] = m, f[x++] = S), f[x++] = n, f[x++] = s, h || (m = S = 0), f[x++] = m += 1 * l[o + 3], f[x++] = S += 1 * l[o + 4], o += 4;
                    else {
                        if ("L" !== a && "Z" !== a) throw i;
                        "Z" === a && (n = u, s = d, f.closed = !0), ("L" === a || Math.abs(m - n) > .5 || Math.abs(S - s) > .5) && (f[x++] = m + (n - m) / 3, f[x++] = S + (s - S) / 3, f[x++] = m + 2 * (n - m) / 3, f[x++] = S + 2 * (s - S) / 3, f[x++] = n, f[x++] = s, "L" === a && (o += 2)), m = n, S = s
                    }
                    return p[0]
                },
                c = function(e) {
                    var o, t = e.length,
                        r = 999999999999;
                    for (o = 1; t > o; o += 6) + e[o] < r && (r = +e[o]);
                    return r
                },
                C = function(e, o, t) {
                    t || 0 === t || (t = Math.max(+e[e.length - 1], +e[1]));
                    var r, n = -1 * +e[0],
                        i = -t,
                        s = e.length,
                        a = 1 / (+e[s - 2] + n),
                        h = -o || (Math.abs(+e[s - 1] - +e[1]) < .01 * (+e[s - 2] - +e[0]) ? c(e) + i : +e[s - 1] + i);
                    for (h = h ? 1 / h : -a, r = 0; s > r; r += 2) e[r] = (+e[r] + n) * a, e[r + 1] = (+e[r + 1] + i) * h
                },
                l = function(e) {
                    var o = this.lookup[e * this.l | 0] || this.lookup[this.l - 1];
                    return o.nx < e && (o = o.n), o.y + (e - o.x) / o.cx * o.cy
                },
                p = function(o, t, r) {
                    return this._calcEnd = !0, this.id = o, u ? (o && (e.map[o] = this), this.getRatio = l, void this.setData(t, r)) : (window.location.href = "http://" + h + f + "?plugin=" + a + "&source=" + s, !1)
                },
                m = p.prototype = new e;
            return m.constructor = p, m.setData = function(e, t) {
                e = e || "0,0,1,1";
                var r, s, a, h, f, u, c, l, p, m, S = e.match(o),
                    w = 1,
                    x = [];
                if (t = t || {}, m = t.precision || 1, this.data = e, this.lookup = [], this.points = x, this.fast = 1 >= m, (n.test(e) || -1 !== e.indexOf("M") && -1 === e.indexOf("C")) && (S = g(e)), r = S.length, 4 === r) S.unshift(0, 0), S.push(1, 1), r = 8;
                else if ((r - 2) % 6) throw i;
                for ((0 !== +S[0] || 1 !== +S[r - 2]) && C(S, t.height, t.originY), this.rawBezier = S, h = 2; r > h; h += 6) s = {
                    x: +S[h - 2],
                    y: +S[h - 1]
                }, a = {
                    x: +S[h + 4],
                    y: +S[h + 5]
                }, x.push(s, a), d(s.x, s.y, +S[h], +S[h + 1], +S[h + 2], +S[h + 3], a.x, a.y, 1 / (2e5 * m), x, x.length - 1);
                for (r = x.length, h = 0; r > h; h++) c = x[h], l = x[h - 1] || c, c.x > l.x || l.y !== c.y && l.x === c.x || c === l ? (l.cx = c.x - l.x, l.cy = c.y - l.y, l.n = c, l.nx = c.x, this.fast && h > 1 && Math.abs(l.cy / l.cx - x[h - 2].cy / x[h - 2].cx) > 2 && (this.fast = !1), l.cx < w && (l.cx ? w = l.cx : (l.cx = .001, h === r - 1 && (l.x -= .001, w = Math.min(w, .001), this.fast = !1)))) : (x.splice(h--, 1), r--);
                if (r = 1 / w + 1 | 0, this.l = r, f = 1 / r, u = 0, c = x[0], this.fast) {
                    for (h = 0; r > h; h++) p = h * f, c.nx < p && (c = x[++u]), s = c.y + (p - c.x) / c.cx * c.cy, this.lookup[h] = {
                        x: p,
                        cx: f,
                        y: s,
                        cy: 0,
                        nx: 9
                    }, h && (this.lookup[h - 1].cy = s - this.lookup[h - 1].y);
                    this.lookup[r - 1].cy = x[x.length - 1].y - s
                } else {
                    for (h = 0; r > h; h++) c.nx < h * f && (c = x[++u]), this.lookup[h] = c;
                    u < x.length - 1 && (this.lookup[h - 1] = x[x.length - 2])
                }
                return this._calcEnd = 1 !== x[x.length - 1].y || 0 !== x[0].y, this
            }, m.getRatio = l, m.getSVGData = function(e) {
                return p.getSVGData(this, e)
            }, p.create = function(e, o, t) {
                return new p(e, o, t)
            }, p.version = "0.2.1", p.bezierToPoints = d, p.get = function(o) {
                return e.map[o]
            }, p.getSVGData = function(o, t) {
                t = t || {};
                var r, n, i, s, a, h, f, u, d, g, c = 1e3,
                    C = t.width || 100,
                    l = t.height || 100,
                    p = t.x || 0,
                    m = (t.y || 0) + l,
                    S = t.path;
                if (t.invert && (l = -l, m = 0), o = o.getRatio ? o : e.map[o] || console.log("No ease found: ", o), o.rawBezier) {
                    for (r = [], f = o.rawBezier.length, i = 0; f > i; i += 2) r.push(((p + o.rawBezier[i] * C) * c | 0) / c + "," + ((m + o.rawBezier[i + 1] * -l) * c | 0) / c);
                    r[0] = "M" + r[0], r[1] = "C" + r[1]
                } else
                    for (r = ["M" + p + "," + m], f = Math.max(5, 200 * (t.precision || 1)), s = 1 / f, f += 2, u = 5 / f, d = ((p + s * C) * c | 0) / c, g = ((m + o.getRatio(s) * -l) * c | 0) / c, n = (g - m) / (d - p), i = 2; f > i; i++) a = ((p + i * s * C) * c | 0) / c, h = ((m + o.getRatio(i * s) * -l) * c | 0) / c, (Math.abs((h - g) / (a - d) - n) > u || i === f - 1) && (r.push(d + "," + g), n = (h - g) / (a - d)), d = a, g = h;
                return S && ("string" == typeof S ? document.querySelector(S) : S).setAttribute("d", r.join(" ")), r.join(" ")
            }, p
        }, !0)
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function(e) {
        "use strict";
        var o = function() {
            return (_gsScope.GreenSockGlobals || _gsScope)[e]
        };
        "function" == typeof define && define.amd ? define(["TweenLite"], o) : "undefined" != typeof module && module.exports && (require("../TweenLite.js"), module.exports = o())
    }("CustomEase");