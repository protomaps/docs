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

## Default `name` value

Protomaps follows OpenStreetMaps's convention where a features's primary name value is is the most common name in the local language(s).

In practice, this is most often a single name value like:

- `London` the locality is represented as a simple key, value pair: `name` = `London`

However, many places have more than one common local languages and Protomaps passes thru OpenStreetMap's convention of concatenating multiple names with a `/` deliminator into a single name value, like:

- `Switzerland` the country is represented as a complex key, value pair: `name` = `Schweiz/Suisse/Svizzera/Svizra`

For transnational places involving many countries and languages, like `sea` features, the default name value can get quite long and non-unweidly!

It's recommended to prefer localized names (see blow) when labeling a map, and fallback to this default name when a localized name isn't available.

## Localized `name:*` values

Protomaps structures localized names using the same `name:{language_code}` formatting as OpenStreetMap.

More than 100 countries recognize 2 or more official languages – and some like Bolivia, India, and South Africa recognize more than 10 official languages each!

A single official language is used in most remaining countries. However, there are a few countries where no official language has been designated – like in the United States.

Going back to our London example, English is the predominant (unofficial) langauge in the United Kingdom:

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

Going back to our Switzerland example, each of the local (often official) languages would have a specific language name value (in this case German `de`, French `fr`, Italian `it`, and Romansh `rm`), like:

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
- `name:zh` = `瑞士`
- `name:zh-Hans` = `瑞士`
- `name:zh-Hant` = `瑞士`
- _... many other localized values..._

_NOTE: The Chinese (`zh`) examples above demonstrates how a single language can have multiple writing systems, in this case both simplified Chinese (`zh-Hans`) used in mainland China and tranditional Chinese (`zh-Hant`) used in Taiwan. The value stored in `zh` could be either of those._

## Script of default `name` value

The default (or primary) `name` does not self describe the writing system "script" or character set (alphabetic, stroke-based, or otherwise) used to render the value. When combining with localized `name:*` values. This complicates prefering to "fallback" to another language in the same script family before falling back to characters using a different writing system the reader may not be able to make sense of.

To help solve this, Protomaps characterizes the scipt using in the default `name` value by adding a `pmap:script` tag.

Values in `pmap:script` follow the [ISO 15924](https://unicode.org/iso15924/iso15924-codes.html) standard codes for the representation of names of scripts and are summarized in the table below.

_NOTE: Some languages can be written in more than one script, e.g., Malay can be written in Latin, Arabic, and Thai._

## Common languages, their codes, and scripts

This table summarizes 26 common langauges, their ISO codes, and writing system scripts.

| Language |  Native name | `name:*` property | [ISO 639-2 code](https://en.wikipedia.org/wiki/List_of_ISO_639-2_codes) | [ISO_639-1 code](https://en.wikipedia.org/wiki/ISO_639-1) | [ISO_15924 script(s)](https://unicode.org/iso15924/iso15924-codes.html) |
|--------|-----------------|-----------|-----|----|----|
| Arabic | اَلْعَرَبِيَّةُ | `name:ar` | ara | ar | `Arabic` |
| Bengali | বাংলা | `name:bn` | ben | bn | `Bengali` |
| German | Deutsch | `name:de` | deu | de | `Latin` |
| English | English | `name:en` | eng | en | `Latin` |
| Spanish | español | `name:es` | spa | es | `Latin` |
| Farsi | فارسی | `name:fa` | fas | fa | `Arabic` |
| French | français | `name:fr` | fra | fr | `Latin` |
| Greek | Νέα Ελληνικά | `name:el` | ell | el | `Greek` |
| Hebrew | עברית | `name:he` | heb | he | `Hebrew` |
| Hindi | हिन्दी | `name:hi` | hin | hi | `Devanagari` |
| Hungarian	| magyar | `name:hu` | hun | hu | `Latin` |
| Indonesian | bahasa Indonesia | `name:id` | ind | id | `Latin` |
| Italian | italiano | `name:it` | ita | it | `Latin` |
| Japanese | 日本語 | `name:ja` | jpn | ja | `Han`, `Katakana`, `Hiragana` |
| Korean | 한국어 | `name:ko` | kor | ko | `Hangul` |
| Dutch | Nederlands | `name:nl` | nld | nl | `Latin` |
| Polish | Język polski | `name:pl` | pol | pl | `Latin` |
| Portuguese | português | `name:pt` | por | pt | `Latin` |
| Russian | русский язык | `name:ru` | rus | ru | `Cyrillic` |
| Swedish | svenska | `name:sv` | swe | sv | `Latin` |
| Turkish | Türkçe | `name:tr` | tur | tr | `Latin` |
| Ukrainian | Українська мова | `name:uk` | ukr | uk | `Cyrillic`, `Latin` |
| Urdu | اُردُو | `name:ur` | urd | ur | `Arabic` |
| Vietnamese | Tiếng Việt | `name:vi` | vie | vi | `Latin` |
| Chinese simplified | 中文 汉语 | `name:zh-Hans` | zho  | zh | `Han` |
| Chinese traditional | 中文 漢語 | `name:zh-Hant` | zho  | zh | `Han` |

A full 2-character language code decoder ring is
[available](https://en.wikipedia.org/wiki/List_of_ISO_639-2_codes).

_NOTE: Some langauges require codes with 3-characers or more._

## Common languages by country

The following country and international organizations worldviews are supported:

| Country | Native name | Common language | Localized `name:*` value | Recommended `name:*` pairing |
|---------|-------------|------------------|--------------------------|--------------------------|
| Argentina | Argentina | Spanish | `name:es` | `name:it`, `name:fr`, `name:en`, `name:de` |
| Bangladesh | বাংলাদেশ | Bengali | `name:bn` | _n/a_ |
| Brazil | Brasil | Portugese | `name:pt` | `name:es`, `name:it`, `name:fr`, `name:en`, `name:de` |
| China | 中国 | Chinese | `name:zh-Hans` | `name:zh`, `name:zh-Hant` |
| Egypt | مصر | Arabic | `name:ar` | `name:fr`, `name:en`, `name:de` |
| France | France | French | `name:fr` | `name:es`, `name:it`, `name:pt`, `name:en`, `name:de` |
| Germany | Deutschland | German | `name:de` | `name:en`, `name:fr`, `name:es`, `name:it` |
| Greece | Ελλάς | Greek | `name:el` | _n/a_ |
| India | भारत | Hindi and many other | `name:hi`, +++ | `name:en` |
| Indonesia | Indonesia | Indonesian | `name:id` | |
| Israel | ישראל | Hebrew | `name:he` | _n/a_ |
| Italy | Italia | Italian | `name:it` | `name:es`, `name:fr`, `name:pt`, `name:en`, `name:de` |
| Japan | 日本 | Japanese | `name:ja` | _n/a_ |
| Morocco | المغرب | Arabic | `name:ar` | `name:fr`, `name:en`, `name:de` |
| Nepal | नेपाल | Nepalese | `name:ne` | `name:en`|
| Netherlands | Nederland | Dutch | `name:nl` | `name:en`, `name:de`, `name:fr`, `name:es`, `name:it`  |
| Pakistan | پاکستان | Urdu | `name:ur` | _n/a_ |
| Palestine | فلسطين | Arabic | `name:ar` | _n/a_ |
| Poland | Polska | Polish | `name:pl` | `name:de`, `name:en` |
| Portugal | Portugal | Portugese | `name:pt` | `name:es`, `name:it`, `name:fr`, `name:en`, `name:de` |
| Russia | Россия | Russian | `name:ru` | _n/a_ |
| Saudi Arabia | المملكة العربية السعودية | Arabic | `name:ar` | _n/a_ |
| South Korea | 한국 | Korean | `name:ko` | _n/a_ |
| Spain | España | Spanish | `name:es` | `name:pt`, `name:it`, `name:fr`, `name:en`, `name:de` |
| Sweden | Sverige | Swedish | `name:sv` | `name:en` |
| Taiwan | 中華民國 | Traditional Chinese | `name:zh-Hant` | `name:zh-Hans`, `name:zh`|
| Turkey | Türkiye | Turkish | `name:tr` | `name:fr`, `name:en`, `name:de` |
| Ukraine | Україна | Ukrainian | `name:uk` | `name:ru` |
| United Kingdom | United Kingdom | English, Welsh, Scottish, Irish, others | `name:en` | `name:es`, `name:fr`, `name:en`, `name:de` |
| United States | United States | English, Spanish, French, others | `name:en` | `name:es`, `name:fr`, `name:en`, `name:de` |
| Vietnam | Việt Nam | Vietnamese | `name:vi` | `name:fr`, `name:en`, `name:es`, `name:de` |

## Positioned glyph font `pmap:pgf:name:*` values

Protomaps adds additional names for a small set of language scripts, currently just the `Devanagari` script used for Hindi (`name:hi` and `pmap:pgf:name:hi`) and related languages.

Rendering text in web browsers works for almost all languages and scripts and feels like magic. However, specialized map renderers like MapLibre have to reimplement text rendering and text layout which is complicated when text needs to be curved along linear map features instead of placed only horizontally or vertically. MapLibre normally assumes a one-to-one mapping between glyphs and Unicode codepoints that also exist in MapLibre font files (aka "font stacks") to accomplish the layout for a large but limited number of scripts. Plugins have been developed to extend MapLibre for **right-to-left** scripts like Arabic and Hebrew, and for **CJK scripts** like Chinese, Japanese, and Korean.

To facilitate Protomap's support of additional, non-supported scripts in MapLibre (like Hindi), Protomaps exports names with "positioned glphys" so MapLibre can use codepoints as indices of positioned glyphs in an additional custom "font stack". While the raw `pmap:pgf:name:*` values look like giberish when inspecting the raw values, they will render correctly in MapLibre.

See more:

- [Traditional MapLibre text rendering](https://github.com/wipfli/about-text-rendering-in-maplibre)
- [Positioned glyph fonts](https://github.com/wipfli/positioned-glyph-font)

## Styling localized name

Labeling a map is typically localized for a specific language audience by prefering a specific name tag and falling back to similar languages (in the same writing system "script", see above), and finally falling back to the feature's default name.

### MapLibre

#### MapLibre styling basic example

TK TK TK

#### MapLibre styling localized name with fallback example

TK TK TK

#### MapLibre styling localized name with script-based fallback example

TK TK TK

#### MapLibre styling positioned glyph font with script-based example

TK TK TK

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

Requires paired positioned glyph font [font stack](https://maplibre.org/maplibre-style-spec/glyphs/) paired with `pmap:pgf:name:*` values.

| Script | Languages |
| ------- | ---------|
| `Devanagari` | GUJARATI, HINDI, MARATHI, NEPALI |

These are primarily found in India.

#### MapLibre no support

| Script | Languages |
| ------- | ---------|
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

### OpenLayers

Tk tk tk
