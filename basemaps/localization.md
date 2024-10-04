---
title: Basemap Localization
outline: deep
---
<script setup>
  import MaplibreMap from '../components/MaplibreMap.vue'
</script>

# Basemap Localization

Protomaps has several localization options for names used in text labels.

<MaplibreMap/>

## Local Names

Protomaps follows OpenStreetMaps's convention where a features's primary name value is is the most common name in the local language(s).

In practice, this is most often a single name value like:

- `London` the locality is represented as a simple key, value pair: `name` = `London`

However, many places have more than one common local languages and Protomaps passes thru OpenStreetMap's convention of concatenating multiple names with a `/` or `-` deliminator into a single name value, like:

- `Switzerland` the country is represented as a complex key, value pair: `name` = `Schweiz/Suisse/Svizzera/Svizra`

For transnational places involving many countries and languages, like `sea` features, the default name value can get quite long and unwiedly!

### `name`, `name2`, and `name3`

A script or writing system is the way how languages are written. For example, English uses the Latin script, Greek uses the Greek script, and Chinese uses the Han script.

If a name from OpenStreetMap, which is the de-facto primary local name, contains text in more than one script, then Protomaps breaks up the name into segments. There can be up to 3 segments: `name`, `name2`, and `name3`. Each segment should have a unique script. 

Protomaps stores the scripts used for `name`, `name2`, and `name3` in separate script tags called `script`, `script2`, and `script3`. 

If `script*` is not present on a name, then it means that the name uses the `Latin` script.

Sometimes segmentation into single scripts fails due for example inconsistent usage of alphabets. In that case `script` is set to `Mixed`.

In Japanese, the `Han`, `Hiragana`, and `Katakana` scripts are often mixed in one name. Should any two of these scripts appear in a name we set `script` to `Mixed-Japanese`.

Let us look at some examples:

#### Zürich
```
name = Zürich
(script absent)
(name2 absent)
(script2 absent)
(name3 absent)
(script3 absent)
```

The OpenStreetMap name for "Zürich" only uses the Latin script so we export `name` and but omit `script` (implying the script of the `name` is `Latin`).

#### 香港 Hong Kong
```
name = 香港
script = Han
name2 = Hong Kong
(script2 absent)
(name3 absent)
(script3 absent)
```

The OpenStreetMap name for Hong Kong is "香港 Hong Kong". We break this up into `name` and `name2` in Protomaps. Since the script of `name2` is `Latin`, the `script2` tag is omitted. The script of `name` is `Han` which is encoded in `script`.

#### Casablanca ⵜⵉⴳⵎⵉ ⵜⵓⵎⵍⵉⵍⵜ الدار البيضاء
```
name = Casablanca
(script absent)
name2 = ⵜⵉⴳⵎⵉ ⵜⵓⵎⵍⵉⵍⵜ
script2 = Tifinagh
name3 = الدار البيضاء
script3 = Arabic
```

Casablanca in OpenStreetMap is stored as "Casablanca  ⵜⵉⴳⵎⵉ ⵜⵓⵎⵍⵉⵍⵜ الدار البيضاء". In Protomaps we break this label up into 3 parts. Since the text in `name` uses the `Latin` script, we omit the `script` tag. The other two parts use the Tifinagh and Arabic script.

## Translated Names

Protomaps supports name translations for 41 languages. Translated names are stored with a `name:{language_code}` formatting like OpenStreetMap.

More than 100 countries recognize 2 or more official languages – and some like Bolivia, India, and South Africa recognize more than 10 official languages each!

A single official language is used in most remaining countries. There are a few countries where no official language has been designated – like in the United States.

Going back to our London example, English is the predominant (unofficial) language in the United Kingdom:

- `name:en` = `London`

Extending our London example, many other languages include [exonym and endonym](https://simple.wikipedia.org/wiki/Exonym_and_endonym#:~:text=An%20exonym%20is%20a%20name,place%20and%20language%20call%20themselves.) values in both Latin script and non-Latin scripts:

- `name:ar` = `لندن`
- `name:de` = `London`
- `name:es` = `Londres`
- `name:fr`	= `Londres`
- `name:it` = `Londra`
- `name:pt` = `Londres`
- `name:zh-Hans` = `伦敦`
- `name:zh-Hant` = `倫敦`
- _... many other localized values..._

Going back to our Switzerland example, each of the official languages would have a specific language name value (in this case German `de`, French `fr`, Italian `it`, and Romansh `rm`), like:

- `name:de` = `Schweiz`
- `name:fr`	= `Suisse`
- `name:it` = `Svizzera`
- `name:rm` = `Svizra`
- _... many other localized values..._

Extending our Switzerland example with exonym and endonym from other languages:

- `name:ar` = `سويسرا`
- `name:en` = `Switzerland`
- `name:es` = `Switzerland`
- `name:pt` = `Suíça`
- `name:zh-Hans` = `瑞士`
- `name:zh-Hant` = `瑞士`
- _... many other localized values..._


### List of Supported Languages

| Language | Native Name | `name:*` Tag | Script |
| ----- | ----- | ----- | ----- |
| Arabic | اَلْعَرَبِيَّةُ | `name:ar` | `Arabic` |
| Bulgarian | български | `name:bg` | `Cyrillic` |
| Chinese (Simplified) | 中文 汉语 | `name:zh-Hans` | `Han` |
| Chinese (Traditional) | 中文 漢語 | `name:zh-Hant` | `Han` |
| Croatian | hrvatski | `name:hr` | `Latin` |
| Czech | čeština | `name:cs` | `Latin` |
| Danish | dansk | `name:da` | `Latin` |
| Dutch | Nederlands | `name:nl` | `Latin` |
| English | English | `name:en` | `Latin` |
| Estonian | eesti keel | `name:et` | `Latin` |
| Finnish | suomi | `name:fi` | `Latin` |
| French | français | `name:fr` | `Latin` |
| German | Deutsch | `name:de` | `Latin` |
| Greek | Νέα Ελληνικά | `name:el` | `Greek` |
| Hebrew | עברית | `name:he` | `Hebrew` |
| Hindi | हिन्दी | `name:hi` | `Devanagari` |
| Hungarian | magyar | `name:hu` | `Latin` |
| Indonesian | bahasa Indonesia | `name:id` | `Latin` |
| Irish | Gaeilge | `name:ga` | `Latin` |
| Italian | italiano | `name:it` | `Latin` |
| Japanese | 日本語 | `name:ja` | `Han`, `Katakana`, `Hiragana`, `Mixed-Japanese` |
| Korean | 한국어 | `name:ko` | `Hangul` |
| Latvian | latviešu valoda | `name:lv` | `Latin` |
| Lithuanian | lietuvių kalba | `name:lt` | `Latin` |
| Maltese | lingwa Maltija | `name:mt` | `Latin` |
| Marathi | मराठी | `name:mr` | `Devanagari` |
| Nepali | नेपाली | `name:ne` | `Devanagari` |
| Norwegian | norsk | `name:no` | `Latin` |
| Persian | فارسی | `name:fa` | `Arabic` |
| Polish | Język polski | `name:pl` | `Latin` |
| Portuguese | português | `name:pt` | `Latin` |
| Romanian | român | `name:ro` | `Latin` |
| Russian | русский язык | `name:ru` | `Cyrillic` |
| Slovak | slovenský | `name:sk` | `Latin` |
| Slovenian | slovenski | `name:sl` | `Latin` |
| Spanish | español | `name:es` | `Latin` |
| Swedish | svenska | `name:sv` | `Latin` |
| Turkish | Türkçe | `name:tr` | `Latin` |
| Ukrainian | Українська мова | `name:uk` | `Cyrillic` |
| Urdu | اردو | `name:ur` | `Arabic` |
| Vietnamese | Tiếng Việt | `name:vi` | `Latin` |

NOTE: `Mixed-Japanese` is a custom `script` value used for labels that contain Hiragana or Katakana mixed with a second or third script. In Japanese, these two scripts often appear in combination with others.

NOTE 2 : Values in `script*` follow the [Unicode Standard Annex #24: Script Names](https://www.unicode.org/reports/tr24/).

## Styling

For each supported language, Protomaps distributes a localized MapLibre style.json file which shows labels in a target language. Country labels are only shown in the target language, place and street labels can have multiple languages.

The following set of rules is used:

- Show local names only if they use a different script than the target language
- If the target language is not available, fallback to name:en if the local script is not Latin
- Hide text in scripts that cannot be rendered correctly by MapLibre, such as Khmer or Bengali

### Example: Milano

For a map localized to English, we only use `name:en = Milan` since the local `name = Milano` uses the Latin script which is used in English as well. The label would be:

```
Milan
```

For a map localized to Greek, we would use `name:el = Μιλάνο` in the first line and since that is a different script from Latin, we would also include the local `name = Milano` in the second line:

```
Μιλάνο
Milano
```

## Positioned glyph font `pgf:name:*` values

Protomaps adds additional names for a small set of language scripts, currently just the `Devanagari` script used for Hindi (`name:hi` and `pgf:name:hi`) and related languages.

Rendering text in web browsers works for almost all languages and scripts and feels like magic. However, specialized map renderers like MapLibre have to reimplement text rendering and text layout which is complicated when text needs to be curved along linear map features instead of placed only horizontally or vertically. MapLibre normally assumes a one-to-one mapping between glyphs and Unicode codepoints that also exist in MapLibre font files (aka "font stacks") to accomplish the layout for a large but limited number of scripts. Plugins have been developed to extend MapLibre for **right-to-left** scripts like Arabic and Hebrew, and MapLibre has built-in support for **CJK scripts** like Chinese, Japanese, and Korean.

To facilitate Protomap's support of additional, non-supported scripts in MapLibre (like the Devanagari script used by the Hindi language), Protomaps exports names with "positioned glyphs" so MapLibre can use codepoints as indices of positioned glyphs in an additional custom "font stack". While the raw `pgf:name:*` values look like gibberish when inspecting the raw values, they render correctly in MapLibre to the end user.

See more:

- [Traditional MapLibre Text Rendering](https://oliverwipfli.ch/about-text-rendering-in-maplibre-2023-10-17/)
- [Devanagari Positioned Glyph Fonts](https://oliverwipfli.ch/devanagari-in-the-protomaps-basemap-with-a-positioned-glyph-font-for-maplibre-2024-06-30/)


#### MapLibre supported scripts and languages

| Script | Languages |
| ------- | ---------|
| `Latin` | AFRIKAANS, ALBANIAN, AZERBAIJANI (also `Cyrillic`, `Arabic`), BASQUE, BOSNIAN (also `Cyrillic`), , CATALAN, CROATIAN, CZECH, DANISH, DUTCH, ENGLISH, ENGLISH (AUSTRALIAN), ENGLISH (GREAT BRITAIN), ESTONIAN, FINNISH, FILIPINO, FRENCH, FRENCH (CANADA), GALICIAN, GERMAN, HUNGARIAN, ICELANDIC, INDONESIAN, ITALIAN, KAZAKH (also `Latin`, `Arabic`, `Cyrillic`), LATVIAN, LITHUANIAN, MALAY (also `Arabic`, `Thai`), NORWEGIAN, POLISH, PORTUGUESE, PORTUGUESE (BRAZIL), PORTUGUESE (PORTUGAL), ROMANIAN, SERBIAN (also `Cyrillic`), SLOVAK (also `Cyrillic`), SLOVENIAN, SPANISH, SPANISH (LATIN AMERICA), SWAHILI, SWEDISH, TURKISH, UZBEK (also `Cyrillic`, `Arabic`), VIETNAMESE, ZULU |
| `Arabic` | ARABIC, FARSI, URDU, KAZAKH (also `Cyrillic`, `Latin`), KYRGYZ (also `Cyrillic`) | 
| `Cyrillic` | BELARUSIAN, BULGARIAN (also `Latin`), KAZAKH (also `Latin`, `Arabic`), KYRGYZ (also `Arabic`), MACEDONIAN, MONGOLIAN, RUSSIAN, SERBIAN (also `Latin`), UKRAINIAN |
| `Han` |  CHINESE, CHINESE (SIMPLIFIED), CHINESE (HONG KONG), CHINESE (TRADITIONAL) |
| `Amharic` | AMHARIC |
| `Armenian` | ARMENIAN |
| `Hangul` | KOREAN |
| `Hebrew` | HEBREW |
| `Japanese` | JAPANESE |
| `Georgian` | GEORGIAN |
| `Greek` | GREEK |
| `Mongolian` | MONGOLIAN (also `Cyrillic`) |

NOTE: Right-to-left scripts and languages like Arabic and Hebrew requires a special [RTL text MapLibre plugin](https://maplibre.org/maplibre-gl-js/docs/examples/mapbox-gl-rtl-text/).

#### MapLibre partial support

Requires paired positioned glyph font [font stack](https://maplibre.org/maplibre-style-spec/glyphs/) paired with `pgf:name:*` values. The PGF fontstacks used by the Protomaps basemaps are available at https://github.com/protomaps/basemaps-assets/tree/main/fonts.

| Script | Languages |
| ------- | ---------|
| `Devanagari` | HINDI, MARATHI, NEPALI |

#### MapLibre no support

| Script | Languages |
| ------- | ---------|
| `Gujarati` | GUJARATI |
| `Kannada` | KANNADA |
| `Bengali` | BENGALI |
| `Burmese` | BURMESE |
| `Khmer` | KHMER |
| `Lao` | LAO |
| `Malayalam` | MALAYALAM |
| `Punjabi` | PUNJABI |
| `Sinhalese` | SINHALESE |
| `Tamil` | TAMIL |
| `Telugu` | TELUGU |
| `Thai` | THAI

_NOTE: This is a partial listing of scripts and languages._

These non-supported MapLibre languages are primarily found in India and countries in south-east Asia.

## Dual Language Labels

With the data present in the tiles it is possible to create dual language labels, i.e., labels in two target languages.

For example, to localize a map to Dutch (nl) and French (fr), one can use the following json snippet in a MapLibre Style:

```json
"text-field": [
  "case",
  [
    "all",
    ["has", "name:nl"],
    ["has", "name:fr"],
  ],
  // both languages are present
  [
    "case",
    ["==", ["get", "name:nl"], ["get", "name:fr"]],
    // both languages are identical, only show one
    ["get", "name:nl"],
    // languages not identical, show both
    [
      "format",
      ["get", "name:nl"], {},
      "\n", {},
      ["get", "name:fr"], {},
    ],
  ],
  [
    "all",
    ["!", ["has", "name:nl"]],
    ["!", ["has", "name:fr"]],
  ],
  // none of the languages is present, use default
  ["get", "name"],
  // only one language is present
  ["coalesce", "name:nl", "name:fr"],
]
```

