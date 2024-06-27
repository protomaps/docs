---
title: Basemap Localization
outline: deep
---
<script setup>
  import MaplibreMap from '../components/MaplibreMap.vue'
</script>

# Basemap Localization

Protomaps has several localization options around for names used in text labels.

<MaplibreMap/>

## Default `name` value

Protomaps follows OpenStreetMaps's convention where a features's primary name value is is the most common name in the local language(s).

In practice, this is most often a single name value like:

- `London` is represented as a simple key, value pair: `name` = `London`

However, many places have more than one common local languages and Protomaps passes thru OpenStreetMap's convention of concatenating multiple names with a `/` deliminator into a single name value, like:

- `Switzerland` is represented as a complex key, value pair: `name` = `Schweiz/Suisse/Svizzera/Svizra`

Where each of the local (often official) languages, in this case Germany (de), French (fr), Italian (it), and Romance (rm) would also have a specific language name value, like:

- `name:de` = `Schweiz`
- `name:fr`	= `Suisse`
- `name:it` = `Svizzera`
- `name:rm` = `Svizra`

For transnational features, like seas, the default name value can get quite long and non-unweidly!

## Localized `name:*` values

More than 100 countries recognize more than 1 official language – and some like Bolivia, India, and South Africa recognize more than 10 official languages each!

Names are strored in a structured format... TK TK TK

Going back to our London example:

name:ar	لندن
- `name:de` = `Schweiz`
name:en London
name:es Londres
- `name:fr`	= `Londres`
- `name:it` = `Londra`
- `name:pt` = `Londres`

And extending our Switzerland example:

- `name:ar` = `سويسرا`
- `name:en` = `Switzerland`
- `name:es` = `Switzerland`
- `name:pt` = `Suíça`
- `name:zh` = `瑞士`
- `name:zh-Hans` = `瑞士`
- `name:zh-Hant` = `瑞士`

### Common languages and their codes

This table summarizes 26 common langauges, their ISO codes, and writing system scripts.

| Language |  Native name | NE property | [ISO 639-2 code](https://en.wikipedia.org/wiki/List_of_ISO_639-2_codes) | [ISO_639-1 code](https://en.wikipedia.org/wiki/ISO_639-1) | [ISO_15924 script](https://unicode.org/iso15924/iso15924-codes.html) |
|--------|-----------------|-----------|-----|----|
| Arabic | اَلْعَرَبِيَّةُ | `name_ar` | ara | ar | |
| Bengali | বাংলা | `name_bn` | ben | bn | |
| German | Deutsch | `name_de` | deu | de | |
| English | English | `name_en` | eng | en | |
| Spanish | español | `name_es` | spa | es | |
| Farsi | فارسی | `name_fa` | fas | fa | |
| French | français | `name_fr` | fra | fr | |
| Greek | Νέα Ελληνικά | `name:el` | ell | el | |
| Hebrew | עברית | `name:he` | heb | he | |
| Hindi | हिन्दी | `name:hi` | hin | hi | |
| Hungarian	| magyar | `name:hu` | hun | hu | |
| Indonesian | bahasa Indonesia | `name:id` | ind | id | |
| Italian | italiano | `name:it` | ita | it | |
| Japanese | 日本語 | `name:ja` | jpn | ja | |
| Korean | 한국어 | `name:ko` | kor | ko | |
| Dutch | Nederlands | `name:nl` | nld | nl | |
| Polish | Język polski | `name:pl` | pol | pl | |
| Portuguese | português | `name:pt` | por | pt | |
| Russian | русский язык | `name:ru` | rus | ru | |
| Swedish | svenska | `name:sv` | swe | sv | |
| Turkish | Türkçe | `name:tr` | tur | tr | |
| Ukrainian | Українська мова | `name:uk` | ukr | uk | |
| Urdu | اُردُو | `name:ur` | urd | ur | |
| Vietnamese | Tiếng Việt | `name:vi` | vie | vi | |
| Chinese simplified | 中文 汉语 | `name:zhs` | zho  | zh | |
| Chinese traditional | 中文 漢語 | `name:zht` | zho  | zh | |

A full 2-character language code decoder ring is
[available](https://en.wikipedia.org/wiki/List_of_ISO_639-2_codes).


## Positioned glyph font `pmap:pgf:name:*` values

Positioned Glyph Font
The assumption of a one-to-one mapping between glyphs and Unicode codepoints that usually exists in MapLibre font files is given up in a positioned glyph font. Instead, codepoints are used as indices of positioned glyphs.

Read more about how traditional MapLibre text rendering works here: https://github.com/wipfli/about-text-rendering-in-maplibre

Protomaps has several localization options around for names used in text labels.

https://github.com/wipfli/positioned-glyph-font

## name scripts

The `name` or `name:*` tag by itself does not self describe the writing system "script" or character set (alphabetic, stroke-based, or otherwise) used to render the value. 

To help solve this, Protomaps characterizes 

Protomaps has several localization options around for names used in text labels.


## Styling names localizations

Labeling a map is typically localized for a specific language audience by prefering a specific name tag and falling back to similar languages (in the same writing system "script", see below), and finally falling back to the feature's default name.

### MapLibre


## Setting Boundary POV

Natural Earth includes support for defacto and alternate points of view
(aka worldview) with different admin-0 `fclass_*` properties (like `fclass_iso`). The
QGIS project includes a data driven toggle for adjusting the point-of-view for country,
map units, state and provinces, and disputed boundaries (since version 5).

The QGIS project includes the following variables:

- `project_pov` (default: `fclass`)
- `project_pov_fallback` (default: `fclass`)

The following country and international organizations worldviews are supported:

| Country | Native name | NE property | Recommended name pairing |
|---------|-------------|------------------|--------------------------|
| Argentina | Argentina | `fclass_ar` | `name_es` |
| Bangladesh | বাংলাদেশ | `fclass_bd` | `name_bn` |
| Brazil | Brasil | `fclass_br` | `name_pt` |
| China | 中国 | `fclass_cn` | `name_zhs` |
| Egypt | مصر | `fclass_eg` | `name_ar` |
| France | France |`fclass_fr` | `name_fr` |
| Germany | Deutschland | `fclass_de` | `name_de` |
| Greece | Ελλάς | `fclass_gr` | `name_el` |
| India | भारत | `fclass_in` | `name_hi` |
| Indonesia | Indonesia | `fclass_id` | `name_id` |
| Israel | ישראל | `fclass_il` | `name_he` |
| Italy | Italia | `fclass_it` | `name_it` |
| Japan | 日本 | `fclass_jp` | `name_ja` |
| Morocco | المغرب | `fclass_ma` | `name_ar` |
| Nepal | नेपाल | `fclass_np` | `name` |
| Netherlands | Nederland | `fclass_nl` | `name_nl` |
| Pakistan | پاکستان | `fclass_pk` | `name_ur` |
| Palestine | فلسطين | `fclass_ps` | `name_ar` |
| Poland | Polska | `fclass_pl` | `name_pl` |
| Portugal | Portugal | `fclass_pt` | `name_pt` |
| Russia | Россия | `fclass_ru` | `name_ru` |
| Saudi Arabia | المملكة العربية السعودية |`fclass_sa` | `name_ar` |
| South Korea | 한국 | `fclass_ko` | `name_ko` |
| Spain | España | `fclass_es` | `name_es` |
| Sweden | Sverige | `fclass_se` | `name_sv` |
| Taiwan | 中華民國 | `fclass_tw` | `name_zht` |
| Turkey | Türkiye | `fclass_tr` | `name_tr` |
| Ukraine | Україна | `fclass_ua` | `name_uk` |
| United Kingdom | United Kingdom | `fclass_gb` | `name_en` |
| United States | United States | `fclass_us` | `name_en` |
| Vietnam | Việt Nam | `fclass_vn` | `name_vi` |
| ISO* | ISO | `fclass_iso` | `name_en` or `name_fr`|

_`*`: NOTE: ISO stands for the International Organization for Standards._
