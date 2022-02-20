const fs = require('fs')
const fetch = require('node-fetch')
const { parse } = require('node-html-parser')

;(async () => {
  let ApiParams = {
    'credentials': 'include',
    'headers': {
      'Accept': '*/*',
      'Accept-Language': 'zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
    },
    'referrer': 'https://www.starbucks.com.tw/stores/storesearch.jspx',
    'body': 'AJAXREQUEST=j_id_jsp_281937271_0&sbForm%3AuseGeolocation=0&sbForm%3AfetchGeolocation=1&sbForm%3Alon=121.563672&sbForm%3Alat=25.033114&sbForm%3Areserve=&sbForm%3Apour=&sbForm%3Anitro=&sbForm%3Adrive=&sbForm%3Afizzio=&sbForm%3Abaked=&sbForm%3Awifi=&sbForm%3AmobileOrder=&sbForm%3AcoffeeVoucher=&sbForm%3AshowUnusualBusinessInfo=&storeName=&sbForm_SUBMIT=1&javax.faces.ViewState=PP6BA4HsOwshmqUhtTinBzIZJf5LNgb6uPtW8s4Pop0ehNe1XNEl1WBRgseWsUQpmeoJLd9Prrrv4TZ8E12M5tXB0Q8TAw6HJ%2F9fL4dM9Z6yDW9%2FV%2BFw33WBtM18Fi925Zs2t5iYKMLo%2FWR8bzmxcqrPGo6TQma9sTi%2FPhnLOjt3rrSmAZXyz%2BiUADe1RKjykWy66hCVAEpp%2BzgpkRQ2OtW2S2B5LhN%2FooL8JbBoHoXmQNcJE8QS1eQ%2BASxapIuh1HlASknrm9Y1H3d6x%2BMco4HWkQNTXlpkFNcK5doO6I45Ab6ms9atf7FFpOI9JLk9UHsUKe0KNdudgoQzfzrrv0exApZ68gUWPfSbPlZR0D63mOXQiQuQSWAQXjg8VXohqkWKgUcgY1tIGQVKwgWicFd3sceMMLvs%2FTAUe9zHv16O%2Fm9dAbe%2FBvYl3vLVi9x9cZBY0KPFqcF80ZHvZYOcc6gZXTzO%2BPvEu51OWUeBQYkFQhEhhWItM1YKTKl5EbhrU1FPCXaRS15QHOuVa%2FYPjrY%2FRzv%2Be90Y75ybumgWHv%2F4Wa02ckMs%2F%2BMy0TAhQS1b%2FfCq08nlPKSHwjTao4KR6dZ8aEf%2B0UWZAS7YZrqzmi8nxf9b1TTptczqleWOJdQwYksAPvtGMHoHTGVaJsOrxUkpwaQ2tlVQYa%2B%2BUtTx568Z49ACqGDV0B55GowzTnD7CZ5NouY%2FIWUbHpcvBpFDLaVupE7ncAxhK0wLSHLZdp1HiTly%2BZEdDCv5%2BlQZTPxl1hlOwJl%2BUKec5KjIoNoAHSI64VshvAv9eOJg0A6e8EbRpVRLd%2FBydkj8VfvG3iIS1IKHd6WCIzksUC7odGLPrsAqWrA7Bx980MkEy52xAL7XiWXeMLkX1TTjfk2nJHdhhekLoI7woa6PTpQF1x%2BiyB6RBOdIYc9nRx%2FgZcGkd1hyfKx%2FfB4yc8TZGwG2%2BJeFh%2FRVIPBuDWJrHSO4pcBSgPDQZbh0xULyU328k6TwCaTLKd3v6hoYJKK9nUZeUvSHJ9r%2Faw1SRGhYmyn3kFbN6cs1k8q5mmuwMcglFIE0Fc2765xFV59w0qfgSZZBG%2BOd%2FzJauqhwno4e4E%2Bblb03NOqA1QPJE9d7kZxSrocbo4k0AEeiN0nL%2FisJdiE2EX8LoCGe6RbhHTtzNKkA1A3id%2FYQ%2BeIfQnQ1CrfeSiEuvrxsVjnnZqT0iSqe%2BKd%2BQBKaApGWo43eb2x8q7JJS8sNHMWvwwNv2f2rNjZ6KnmrU6IrcISZmJSxnG4gl9Fn04lUaQcbT52cNVQHl99gwSgR6gsEycPkawcoDhAjZgdw4%2BSbNcT%2B1ROPFSXhCDBsh%2FgNBpVX3x%2B8ksX%2FIyPov3tUuZOGAa9mXnB%2BITqD3bnZr247k0BF6eZN4z2A1Yz4M4hHYz0arBTcDwLBFJaUT%2FJE%2F9%2F%2BMsC8EEIW9vSLr09nNpPnkz3N2TOQ5yJo3wGWuOWQ%2B29I4PwP327H3c5RbrZeWgQ7%2B7lca9Eyl5iHxmeD650rajNL7b%2BKMmcQkgjqmhUR6mgp6J4FR9UOg%2F217ef3Z8MLeCpUeu07QO5tZ9EYtcvC3g6zLHyWjk%2B0Gy8Wuim3S6RCDwB4R6zrI1GMX7%2Fi24jGK2%2BNH9vIoCF7Zkxab3kawd6CcL9zj0mGWAX7%2F%2BhGyT8elO%2FjJSdFHTEdgaKlI63iazDQn4BW0qLsEFq9F9asmvEyRQcW66wjiTpsi6FhQInuZ1ntoxfjJCN1OSzTkZ9h58YYZpo1DilDTfxGgx%2FThSQvRoDLP1AD9S4jhHW3bYdgC5mFoKEcgb6SFateHjuxk3P4gEJiUYadrVaRJNyVVHpt5FLhUo5dfUCSUGbWmLhlyj4b%2B%2BXMjggNmK16tGxT1GGbXwSeSIiAU03qqvsMOgSAnmEcKknTlL1tdyQZ%2F4AacaMKddQKcP2SjmqfYQdPUdxb7Bo2tozGLGrgmowjphrjQe8xaliM6fSTIWr2A8Sc1JyCL35HFYJThCloLUUAmsoyRbo89xvUF%2Bvp%2FmIYfz9Ksia7VdLZghPrUF4dKCGQppOJpI1%2BLpCOhQj84fjedgRWfN4izyjCaxF%2FiKv5Ec5cu9tzFMjML%2BuFasWq2F8tuVnLaSj%2FEgEo3B1V1RW3bbcy13Zyf%2BZ4esm7ofuOXD45%2BBoXoXdG5UkZPzkY%2BTBINl9cjSArGHFErv4A5Uxp8xDLhmpc52TW9qLYOTjKUu6wd3fVSyV72jolKlM6spxAivZYqCujDQrJGEJs2JXWMfTWo8QFLI4o7JQ5plmKLWtyhHh3vKFkdr6eCW0uu8iA7XL%2FAevcJ5%2BJFEUgZPq7SjvrVMJh%2FCkieSXpKtPdMti1li0TScaORpaBcYNrSqY9%2F8zNdH7V9ELWKgs4c3yL3UZc9oT4nGuHP3%2FozA1QfF8hdmoQCpT8o5oe6qGl%2BajnjiJ5hhsojJOdxifBH31R9VKvjXgccUbMLKnhUhIDsz3WYJKrBQTL82xSAevV9GcUn%2FHf24Q%2BXrUkVzaAjh6g6cB8GdMorCslYGTadoTL6rNawbGYU%2BZUmUg3zvee4X3ZLFHknBp0oTcuzoS0IJcOPz5uRxzWSfsrk65CDx%2BXc%2Fp9HWyv4H63xYSP2AjEdCNKH3iwhPj3dWueSupOaqTGkbneag7zqexmvQ7Bo3N%2B7T409d8LxzruBI7RtYREZAtunJOaxC2mZwH5iour5mbuSGWLpMHiZ1%2Bo89tNDZtHIW%2BHEKr3nM3LGcUioatqOlnToGbnJFjw9TfEvKYuIYJ5Eg%2FZTdD7n2SKwJIc5nxHVW8J%2B8PvsujtfKI6pjbr8uwIhkR6J1co1d8kFQwIw998W3xJr7LwxoMZN7ilgs%2FK1DMfeJi%2Blot4pesN6fXfJepfu7hpqA%2BT%2Fx65EszQNpbJzhrU1yGSV9ECrzLSbljY79HHYZ6GQeLnLNn5qUT7b14kAXVp1wSOx9XGBlxDR5Igbs9wyhSFd3i0YccJ9dgL%2FP2Xt3miaE9JegamxTdcfxy8%2Brh93QEXkl5Pf90nv33VkFfPQiJonYA4L44GSdIkJC4fSq%2FoB6Alrqi3QyKf5ckW3Hr2T0wSiLPW4VI11r%2FV50IAx9gSalGjLVjrZ%2BXpy50XFBrUTa2E%2BACFJKnia%2BTMZujKHNG9VWVp6MFQRralnk8z9PIlvmexhouVZ2I%2BdH2hK2tHrxDEGlp4GArL6yp8Pq4Fq%2F0yU13jMHJkTIHCsSnSSTvM9vHll%2BnNF3%2BInnr%2FR8HnhfJu%2FzqK8tajUFRxGYb7j4XEcNJUcFvHOzk45o7M4VPkw2Wg%2FdOjanGKQf137OdEbehn0EbayIH2OycZOdIeEaFGFyIzuhHs9EdrcPCBQVqJ4UlUSFq6L%2FNClVdAJuIYY0FGGghUNjVy3Bxr8WzMv6VDoEIoVsnookI6G3Nt4wn3PAutbVp4fZGTMAE4%2Bd2f9mcLr4ybNqTP5H5p6wCsW1Wq8%2BzQ28RXIlimxoMfIxJO4Xf9E%2FQ2xTQXwXLXY43CSeAbirsZ9rVBBYLj%2BO9d9yPveVQmFE9SQj1ynbq12SgT4Ey8y7rfOinr7%2BDV6nzmuPIXKSOAENapZdIP3YQOa2AreefGwMbFlQcs%2BtJUQv28zVJ%2B46ASZAUp3Yx5BpWjDGpiHSO8xEgtl4ztcvkegCYZrc64Xllh1%2BccMQvR%2FalPn39yCCLwh0fEnsTN3fyeSgdT%2Bq0O%2BmkbkwX%2B2FPLcnQgdwa9%2FaCwderAwXmkUGxeYl9sMk2eDNJi3u07Nra9Wf3qUkMW13FktmMcU5F%2B%2Bbx97MDInhBbmIy%2BoQOsYwUSbzOfcA%2F7EV6Vz7XXhnSpD00sUpk2YXE2QXprALP5kcAdz0uzdc137LYG%2BUcx37oF%2FzQgTf7lyZZEgoAcYi3wD2iZluMpfW4nyBTdmpVEvyI9gQeD7m67mrFvfNEzmfudlTIJibbPCeCMwGUTwh9XgIQbDUCom5%2F1JK4T4kXQtRGxeO%2Fvg7p4NClS0HQbO2xLG4kKl1dsfzJ6gIdBWcrFlSnQFW1eAZremz9NVSddTdVQH4b6HK80NfbtHwtnfHfSGqupvVhOiH2hpsnQJrbv0S7dewTj%2FBkP85QGbBRCHRTC1HQQr8BXm5rgj7Dva%2FG5WpvRxTZE7I74a1znydPzNVbAPzS5A6BOXWTGcF0wzcNQY%2FpKKo61FEp20YP0%2B9CTkBtKtKNB2R2YK5RfG7MCAuIMjychqB77fvAPGXGh0zJPejvsyYCbJIg7G1kDTW6zgqSHXLurg1Q4qIdXwDEWjd4cISU9Av%2B7CMZNdt82tJCvdjlLL6tDYzGylwOhdhlv3da1O8AJR2DktFnqDiyU0yHnmJhz2xR%2BEBJTtW1CirQjDDxJ6%2FJPiqphd4snafGoSw5AF64Mll%2FLvwv%2BopA%2FGDzH3hI9jwfGcgp6TgrtycHeyJ2LfCdDgI8snC5Z1W4rYVSO7ZEGExE7Pv%2FSbQNJHn5fJM2vg9MxyrxK6CKBH1fiopiHLCTe9GcRyJQRY9226EwgIVXAa7c0RDaibr%2BPqx8%2FzjW5HcvOyMwP97joFFg7l8MSRZEXXyNufQhbBUmDYoTKm8XmP%2Bol4KD6xiBEdvU%2FaaNflqpqBeogDwYsgUcqivnERAq%2Fd0VJ9H2HdZhJhq0linZy%2Fum0cc%2BZim%2Bhf5bAVSDBfoRNOrJIX9RVcH6HIOKHOX%2FrNrXE9RhkoPlWKLsh9V%2BnudKNgQKY37pNJfdPmkatDIAMercMMGUCs1t9UmLu4GPmxDiWzJqtyzSl8G9ifcikQxe9qQOaEg7qqm%2FFs%2FRF6pf6fcJIT5DUbFoa%2FDCA2E5PeNExTfew2kxVB3y4taOgZPRBz%2FfkZyiusgHU%2BkV6W65nY2t9FYT4TgUu8lOOVXQ1Pj3o%2BSU6x7l3HBmPqswiS1Dyb27dS2AEf704R83uuDOHTbbv7HEaKWOXyEuYQB%2BMJT%2BEMntRs19cLDmswYHfNkb0scwYKz3b47Hln%2F8O5qeIU0tfb3H1hsXk%2FiZiBCHf%2BYJ4p2nqy%2FiXj5TaLyL6AZMH0GZv5YYF4L3DRrZGYGKfnFr57KAavr7A0rRFFx1c2QGuzibfNIxAQ6KfPaCQUijoJ6ftHFXh%2FM2jrbxj%2FmUqFHaU7REB393JHVx8%2Bik07NPx23obepQ%2BAT83ddfFsZlGl07gOVHPavMndFGDioGNIaZV5%2FT%2BoOzFF1pHLh9LfGeRCx7ldH0cVSOXg%2FWu11ls3HU%2BZFIqrEsi94EJ%2BppzLhaHL1rI2hbi2pTPjkd0ANP1zK%2B%2FKe2sachKCHUiQZAK7u9UHLJbTVJkwjnLxfPrga%2FITgDi5t5ffnI8NsKwWLbNaJSz9109eJ%2BbpyZLhdvAyoTQIk%2BJtHK8t7w6WpSGDnpnJwaG1QsjMY8dtmf7z3Uybp106Z898%2Bda%2Bj55x24Bblpae396jJciI0ZNWHPUXz%2ByhrCD05a1RqQfr%2BPqHmA%2BmJfVK38nlN%2BXvIKIbpcn0l0yLs1OhsSpIp9OAHX%2FyWQW543cbewI644HdWgkQQNehk1a8hf3KX9sdWAImEbVY%2BxqqKypycowTnKoKjBNx7Q9OTGJA1XTHmlL1nvAJaA%2BOVEmyANvvQdNw3jgxr7jQzyNj1U2kZyCCV0kcFlLj5HGQ%2FuQodapmqTxSERWDf8a8LxlDg%2BC4jQczeGt9oeTSY07zgMIJw%2FT2nNi0sYABNRLCIlJABkipQdeZqTuCtj%2FkNt2psaTWAdS%2BmAwue%2BmCPRdncEIuhtisJbhHcVWIOXzHDZOriAZZM2JUmLdhKxEGAXkoJ1yo12qFZjylPiAVJftrTm4WImz0yoSJnnBECgydBLQqv%2Fy2z%2FSDy2zsuG%2FRcIAQHC38Z7VzkU2lJ3nkngNKvxVfuIGcgkauPBrHS0oXO01177odY%2FId3I6t5%2B9ttWWyQtc0q6T8LV0o%2FNpeGu7E%2F3S4Sk%2F3tqUSQS2NxcfvWXQyDhKeXGhJZK864%2BS0IR5ZDebK7UjOcrcUJn0aHdW8MNCjHkTZdcf1uPSD9VqLlUMNXR1%2F2ajtrnKu8Q98fscMctwZaPHjPMN7id4snD2oO3n8PMFFcNZyIR9w1mVmA9iX%2Bg1at3tJiKrlGWwi7t2zVMZhGJgcAzOU2YnHV7mfYluzhMptzCQWGF7PNnWqVgDd5HcoS7o1w%2BNzwv6nV00g65yW5VMArnHnrx68El5znv6m5oirFz9kaEMgIFJIdS3j5Tp8BPW4griyuL%2BdqJ9U9Taxj0JnP2H0QQFU%2FT6jWKMejF9ShvBqOHnI6E25fNbvgKbQkzxsu9OM5IMWedzCVGE7SFt82cYYY495faH9hiGSyIOld%2FMW39CEZdAQRCKcbdxRDGycTZ6N3c6E9FE9zrBV2%2B7af0v01OY9JHqKNEWQsbeWMHwyoNQoJ%2FG6LS8TRygWoaApJMsodu3afoq51px6oqsrlDWdd4PyWUEnoaA29iylOBXq%2FsWpTFdfHVDozdzU7jCTG9bScLmuw7ecpESYY44%2FryHBtncGo0Dbl%2BC7oLo%2FgEgU1VbtutXqmVS%2FCvItXmHaB0h%2B984gksRXtsBdpbmmEDfav%2BU4d6KgTg%2FTCqUYX%2B35g8rkaAlZ9%2B7OMRFHASIWb7Rp3zBTC0sxWgUFqN9S8eJiYdj4Ik7699gIqgPqRZc7jYurFqD8nXNdTDKUtVcac%2FX%2F5UHNKL2pMjJ5KxEaMmQyeiteAin09%2FVXvg9DadWFustRGiGjKc%2BboYuN2MfTQAnSJCCL62ONKXMWjeTv4fgqAvChq8tk7RpcI1%2BPrtWO9gx8EuPzaIIkmCG6GJ4t6g%2FESZ%2FTuKiSti2AlCGhbypK0sEyjHRPloLguVCQ0zVKYEEwaXkflDOc2QL%2BOLkc1uMT6jkjUlE88L%2BZQrvsZ21kptqV8M1d8DK8dfEicI4d5J01yUTFOaXEK6k%2FV15U%2FbvcTWQRtUHSP9I0mcHBz%2FTQFqkaPSp9klbiXMFEn2KOCeaRYzpNgfDViaGc13PXPbIcQgTG4oUeBeMU30l5sWOG0Ae5PhXm%2FegGcETa2knyhXeMgP7qr6vSjkKXi6RIylD5dNvLtCuYPj6IgXEy7NNQbzlwj6ss7NcJ0JsVjiSBanmD7BOsFEu%2F1sQMt4an3nT91Gvygs2gqBidLPDbD0JzqONDVrD6UEUziF2Fm40g0BfaxUzNImHqutFq0x70XzO5SNZzRb2Ksxa9dATDJ%2F0LvcyDIkl8z%2FD8DO7ZiRK79aaJFfdSuUiDb9Veyau2OldaCBlEEUFoPMoZmsOXqAaKN857P%2FxWoyT5BMROq9TO0bsIFLwmm8sZQBNN0NITOZd9bSs%2FJT5m83czHUC3dot%2FVxgB9W2DLEiAR0wmHNef8f5SNkIIAc9D2F%2Fc258eevbRW9rypbUhmKBEUj9HZnf6bzGBezPvkXBxWa8wlwuZw4FPhRMI4d2Lev3QpafCD2GqjPX5QPCz06vEbASnxuY2Fv%2FHsZrOfR4oqNYmEKCCKC%2BwlADd9rl9WC0P36fR0yj7a4AzTji89uqdfToSUKL9EgsoWiOTHO6MqUkNjqKkrzxNWZ%2FqFuCROxX4trWt9s%2FCpeVCNgUZphFZEM2j2p8LsJPRxwK%2BSUz%2FEuM2iaLh9oeF3jtWERwDb4BTrNirFWLlTrylxo04GCr1IxOlijqaIoulHM5zAhgSLpXWISI05G2TT65Ddn55itN3tG18Fn4POpg5frA%2BHLHofu9qDbi8BeGpUs%2FZAfnB1%2BAuJT3KCBTQ7Tfq%2BTaDF6Ovq59X%2BIUMYzC%2BY0gjo3Fh8z0D%2F85aENbYYW9EoNZqGbgk9toh9Kw7y23A59vTxo1U%2BOgFRoYi65Oivy0vnrgere%2F9nvViBrR%2B%2FEe9BOG%2BeC2z1%2FVRpQ%2F8Kxd4LdzsZrSQV%2FqfGZsGFNsU%2BCv8qoaEg3VFuDrx%2BcNJBLHgn2fOxzM148t95ZGzSlQm73bmHl6LawqIMrQHqhzNa4C%2FWZ4eoeTJE%2B%2FkFT3RV8AeKAUD5v2N2H1%2BvsyRwXSKH7vXJtryhOIeRrUSrhJSGGmMNAiyFuf3hL1TenVdiWGSjizxcNyWpGplZvFu7KTHG%2FbncW1HuyVbx5PPzcNnX2ujfetqJj7mRyBQ%2BaM%2F5X5i5K%2FdjedBSpbp%2BjJaIIZrBIvHeSR46vtQvItH23FXhjhmTNFV0toK56FmPxPVUHJtCB%2BjxKX8Vj5ISuTtLP4rtyiMm9m4WYEjKBeZ6JDDToRYPjH1bHk2MJLhpcHwJ%2BR%2Fnlr%2BhGh89tRAbTiGeTTbzsbPHom%2BFd1x3Q8asqRyEMPrrXzS%2FbC3luCHwetyckqAudO3K%2Fg38wTj3GX2AyKJuMZYtFvNGRKAmhytDifzXmn2YMivh84mcGjm5iYTw6pk4Sv430KB1JbZPa3b5yWz8BmZGNduNtzYQmzyUI3iaLcYqpYV1fz0Zah%2B%2F%2F709e8FB8DbX1h%2BM39G4xGeg8aPpQ5YrtFDc7qa%2BhZkqBklXd0d2Ugr3p2PDCZBQaTDf3DdKfmfnMrwlJvyaqk8v9h9X1vFln%2BNhyB0xQ0XZnZBXBEr%2B5Ewpnd8eOuodnOdPn5ssEzH1NEs0V0vWyxC06yEUvpWdpP4MjiU5U0BrSn0Xr3Gb0zz1h9IUM58EvK8wM6jJj0al%2BGxYmskgSu5PbMQMHyloqrKF5yKoGZ0qdAyBD8F8%2BOicjOzk3%2BournZYmwAY326BZCT02TJ9XIJXTlu2slh%2FPN98cl99sMEyDlw2735FG7wBaeGABVhVoC581lAbPzqk5nwyeKbKUY%2Bra7UIz89bjHAQmES0El2PT8p%2B9%2B9h4RShhpD4fd2AWzpCm5nmKlcfYKxHOpO2kEeKGjtx4ysVaF6YSshl1Bo96L025XMn09T34CNUfmjGGco9ubxImLRC7DiWfzUTTyqOcCypw6hWgCDuaWya1myZnK1Muznk8o85MTdCHeEXYQ%2FkrKwgzuXv%2F6xqyc%2BAm1qhgyWRK%2Fmc4EFZmsH9y7%2FLcmAwvOlVjQ1Tl0GX2FiRYWJghpS1sT7TLFA7x9GlUOOH2fcDSROEfDTFLH1eytdnTGi4U6wCITB3MLw9TWSH1KYSZ%2BLEudhLCX0PX4dVG2IS1PraR0ZAmxnsCbShpIudeeXDuI2IVkLL53xRO%2FV2jYjYdL%2B8%2B4DMOXQSzQLNn69rNwGmaVLBDES56tekSZPJ36UDzkbrtYpuD8pHTi9y5%2BIJ7fXa%2BJvS25MZBiH1P8mn7YmUp7mu6xi7E6wCVoycQgLTz%2BiEsVO%2FntpbutZ38e0NHvRWi1INCIPfsEqMfZClLhKfqH89hmFNbbS2rR1Z%2Bq3aefRWIJkWPhTQBFGD34Bm3IDr4g285SKyM24ppJSecGZU0E%2Bu2H9y7Pu4ziJKP%2FKxfVNJmvN3muR%2FEZZtdwnCjZQQvE%2F5sNchCQsN7gOord3THSbGJjtKkdI9M2yPTq0Zn7DoFn5kUf1iftm%2FkyreLfc3UZwAu6ttvx8cifgeLOaXWO%2BGoAXDZ3DKoS3ba7BY3Saw7fpVhV4GHBYCWR%2Fqm%2B%2BaFBJUC5hQcRk%2FZi6pjJzyxIbShvaE0GFBq%2B%2BdGbRGNz3erzuN5Qsc%2F37tD62KlTOCWKj15OJE43w9ryvY260AEMhJahAqQ0jZiv29LkOzyA7H62B0N5qbMiHWourLenok73G0wEJVFp%2FJ8ETh0NwrS3fKBW3y2czCIfn0cWNu6KmSYccZluywU4ThvFTctul33H2pbT7st%2FJ1EHHugxJVm4bVLxhQf3XmneJfPMSLzh2Z4uebPX%2FNGbM%2Fwiz9OHjBONgUoRNv39rbFaiy3wd%2B4o4UH0VFW6l17KQgR6wv4O9QSN1vj2qB%2BrlUmZVZ8CGC1ChqglfruizhgsLMd19i%2BdkYM1SwyvOJotny93BvUkAjBOkqnT25QTPu%2ByJDNFSCglRt5YqIpG7nwOTKKEeyGhuS2Tc7VmVgiDUBpmvGfuJiFpVs26f8cQ33Er7nZdQ8bBsy0dVVNMqMUe%2FewERL1ZYwNTe2udF7L%2FeH5pd9hdxV%2FZ59SKU9EXj%2BH31Xa76R7lbrCQJpjGv%2BdSW83B8SJ1KqZTNni8wsnOJRp0uoAO7N7G6qAZbYJDnZeGaTpt5zZxn%2FNiPUjFeCq4c5WmgjIOnY0P%2F1KjdeoPcckpc3P759Jyy3aSls8M1KTmJ%2B0RXq0ir2WikM8p2xX23eGRky7dtphuOAmXmcfVS3LTLGdiOMs6kEUNahCoubNgiECwnKTAv2S9SPa%2BfaaVCi6EE5hqWnb6waM2e1oIMC%2BBZAiIrNZztGDJOuu4xaY3SzpvcIWIlguwQ5iPvKKAVO67FaHRVSXT3anuTk6YMeeUIdDIyko%2FHXBPy9G0JKZ5vS8hPJUNaaYDH%2BvKw%2FRAkQhpo%2FeBhN3kk8R3%2F5IYvIyuGI78LD3ZmcNv%2B2bYoJTblUGpK3IN9nT6ojniPDsWrSzLIIc53DAU8rf8RN%2FQ5a8XuLOd2SHVW5YuUdMXBW4IqGiHUZiRe2YGt1CYmhRVRzbLJZAQlstphG2%2BQhdUoD68ZQ6MOxc%2ByDpP1L%2Fnb2dFa1wqr44E9rkRiX%2Fkxa%2BbAuC5vNwot4dSHTTxVu89zEAilfi4EFJK5Oz0zt1aQ8RkiWKJ%2BSsLt0W0KaBM2%2B8x0w5rfSWmGXkXsdb2V%2BkGl9DeeeQFpn7CPwYylNG2y9Ga%2BhzjQzu0in%2BvIbswKPKksuvzg%2Bh7ZEq6CmOf1Ye5CPELfUF6HeD7tMiA3uunqU9VRzhuuxM5KUm80OXf%2BCiF90bOb5avXY8rgryKmE93nAnkFwUdrxZRlr7HcZK%2BaF6y6VzKFkTQwud%2FMQ9n%2FlDQ5txXXd%2BQxviDI6q7j30NNqduR2nqEwXSR71h%2BQz5VXl1DNh%2FXPWIRfem%2FH4pX5RTBpQHr3qpm%2FqVcmxe2XTZBtq3js9ycEZQIV3IzB2zReindSvHDeKwZKaHjDBtdSJu1FzHITTqLHT7gU%2BztuqiEr0orKHCPVWdEGg2Of6eBZ7T5PV0ShTdpHBTiucrYuagfHGSiM8oRHQU%2ByCVqPqC69Mk2gFbsQWlHr%2FqN8rcMgYAySn62JZ3neTn7wlpyrrK9r23%2FEJWBWVZfHmOMuRWsJ1COS2v05DLFoN2E5HFLyA2FpSLn2L4EVmYgRKwCgMoZzH3jy7dmAx2JC%2FoV8watw%2FpojaXqPc8QcLjyKu%2BC6F4CvNdR%2FP1TuQYyp6V%2BHvDZVVkDWglssALfalWvI6vWJwVflCIjJlj22UwHPOGapKtmcbKPd0pJrXYan1ZBX0fzAhkK37eEi%2FlXKML4H0E11LrzPDlzOmw1PAWAKOClt35gvbJFczMNAQGupBgPKJRvciJ4jBiBQU7IzpHgTb4ftj7dRT5X2DlQOQAS5vTCQJB1BFNmWs44xa3Hc5P6Nn2amTar24EemJK5INMWxUMKAHy7COIvWm6RLGG4nGWQA4LMeahYBKBGEs1f%2FpYrrFyZpEWFrZiXC5SCHe7D3fkQUgVCW43BjmthxeCr18zpTzECa1ZtnfNUXHP4cSY1iUV1%2BAhQzSm2kji1PoBDgc9aAAIX8gBdA1SI6B9xC37ZIxjA66veYRgYR1sskBfsfOC9IfwQf8TWdhH8Jkj9DEcasfUI1Mp5l5leTwHfPqklsbIY%2FXM6YbiNHnuHNIQqkjoIaLhIOGGeEwpydMoL9dkZ020rZMEvfLm28hxxFuqOUB0M9v9DZliHhfDZV6zFXLPHQ9KXyzBG9Us5wQRId8pMD2XdMN%2FoPTXScrWuRDeSHY%2B2SRJAoex8tPnO2x87AUt%2F54z4z%2BI2kwymix4lopXo1eP90kcuxbkKDa9Fd7xzrxuS609k9OpzqSmZl%2B0L23JsTv%2BVAYt1BP5I%2FGbvYPJstxc8tXFEHIvIh%2B1BSV4flyKqAbYOH%2BuDRJTZ2I16t4bF0rc3VHQK8E9%2B9nuFUPxhjhunHyg0bQXozrH9NOVU1dFzpK4c75u447b6t%2Fdo2seI00AZK2knjv0Eb%2BFv1es5Z%2BaT4V0vgNyfWGXXgainyDWka5%2Bgn8UCraBztBW7HC%2BB%2FHU0Kp6ZQqKYLS7F91Nwc5wdzKIkxjcgp0S41iqjbx%2FH1U8HVNNwSnJ11gWckXcZPheD%2FdwFSnvskkaRsCKzofgwBJYkosB15pNZMfYuOIFYE%2BX9rxRf%2B2XHFdoQbmUK93wcdyhwEHBppHrYDUn8q6Fd4CGHGJk7pE9UmfQ5WkMkv20pVXwLVi2SiSeDHPTZDyKjm5ZuQghDIL%2FvoGhRqfut4qxgSe8RwUOB47Qcjp1cipAPgzSq0yL%2BhDdN%2B8q8naTk8ycp1ruEggskS6bJFJzbvA88Sg8IyaKBBDmAghc8sKZX89e%2BuDu3yzs%2BU%2FncEBd9MjFSp%2BA5lm872q2UC4k3spIYCk0g0Q3uAHbOGVI6BPjpVOuRgihjT5o%2Fb3asr6ZB1zGOtX0yfuzcYY407u5%2F3g0pBSRoy4FfLZcgVcU2lWZdCvrJzqKMGye2fGLbH8toBNAHimC0FIej5a3eahrahsRn3elf7WHsoaqC5tedS6Kz%2B9WhkpwPpnKyTlGqScRWC0Fz7%2BBKoqSXfj7O6DaclMcjUxkIdTNksJ1cxKwp2c0eLlRoM0QACypmpifBmIzgLcHqyg3obRIyOu49%2Bo69xoM626KiKH%2BGYACxVNRtEgpKerY5sATFihgCbvAHvrhCHCtCAVPdocrkQ1hY3oPUaJYs6NK3pjluYUANJmivmeJ%2BwtqZI9lpZinSf1lKem5Znr1FifhNQ38diUGkDaQNmnN7Hm7Esn8tEKKDjx4bc15fKqAtytZ6NQpNShyUh4DUgEOGPpPJUt07ydfOW%2BQADq8xqIQw29Gwu85qNsbq7FDv2LepopzCsNtMTbx2DDuTnYioBb%2B0qnjgQqSPT1KnyQxbMUV2K1g0237EcnhcDIwTjcC8D1orEeALhch%2BTLcoZ9Q5xGhxharXnCMdTAMU21XXQyOWv3aRwwVmmKRwm%2FNFnBc2OFEwsTs3rj9STFjJEaET1Ljh5uSfY2PCGgQeGU66MdEucx%2BTCfRKNP2bv6RDCM16ZuBRH4t3nZtBXfK2kVTs4e4vIgIzpjL0uCDrLVCy%2BvXsCQWqh%2FN6OlGmM6UHtL1mm2wFr4keBLGlDO7Oy7jqrQF15DZBKLfAlIXrBmfxH4K6LfTOgrIG20G9F6ZcxR3AzuGup27s93wOGjTH%2BACXXM2%2BW9JEOPsEIHbjiT%2FChwzYtmPqUGx%2BsRcfrbTkqtYQeR3D8MwnaGcNvJ%2BU%2FqGf8ijTgIpbyS14lka%2F%2B%2Fd2cuw7QqZbAb7%2F%2FENiXtGm74i3LIh8BXaBwJ%2F51S1QPb%2BxXuXu1P1I%2BfoAjK2jY40kzoR4WR8FuxBEw4y8lkaYvtYZH5UhfimFSSWJORVUHUd5L8yPKxy1QYjAVeyFoC9PyOSCmK3ujeybNyyVIKXUzNwfjfsWy%2FhEwxysYB1Ub5bqq2tck%2Fh4qYDagSFMHSVN7G2xYJxpZ8KMa8A6KX1oZW35UFhTzE8uR4JZ04rUy%2BEM6WMdmz60QUTinG1%2FbloJaQu59%2BEcJdorE3%2F%2BURO9MRET2392CG0r7ldQmZDPOZG7maJm%2BYpjHpwBbvdL6v2460Qm%2FAvdDaxYooU8QCAJd8UHTfYRobfWre4B8QTop%2BBU1IvGTrAMqmOYL%2FTMqZK7G5cx9HPHzzVq8nT6TTGQhCnqxa%2F7dfBBF8xeg5txJavJUIDtwRdhIcVzWypk8nDeZWWn3RJLH%2FI5XMStdvObCUIhdOYwGKhJWWLrQERcrblxXuZG8CP3dSogkkG4Z%2BYEDWUhi0vmNKOSEiiRGWSsmmCYIiiA0EUe01nHjutHg3eOjXD7SiTOiHz7Whof%2BoBe1iFsZtPxG2UVYVi0sb7mB1tsfRUM%2BADxsoAQthUnAbrjR8GFxWHJMsV5L%2FGzjmHRfUt4Tuq2GkkRnSgbvEc%2FpPr6ME%2F2v0lxmfGyt1miUHxsg0xAOshhHdzQ0%2BmZFFr2VDT87eZYiBUlNeAinRn2EhnPZ%2BQjCJ7OOeeFcd3P%2FY%2FYywStCzAjkRMcO1ewyzSVPRESg288Zsf8%2FIB2e0qtD4vQwnMthY46BWbfWgCvRinLsYmhog63O0lZl7ycZ8cRYDHYB83dGeBhnekzzoQtfqDEOSxbn%2F876w46TPq8ZWiMqIZyD%2FTYb4NdpjTWogGi8LCWxyd%2FFXENiAS4SimUpJxNMVUfnjONnAjclt4cCpCGF3DXyzCVxJHRIJFnm2ypgvOT71R38Re%2B7PMJZxRFkPeKydgzV%2Bo891d8%2BaiDcaLiUqDzT7QMTveHpup%2F3VrZsiwFkveAENKeuulOmc%2BxCt5Ck2cKdHh0ZULdKGThM6YvzNx48pQU26YlBTwWkYGkOVI%2Biq4qle%2B4MMp2lIwYpvb9qBGtZTOpWTmgr%2BhmhNU0hkL3xKnxfZaZdM6T946lbzzoioncnWJpPIB02%2F9hmK7zmyBAE%2FnzNaEkcfprUneCNpMBR17BGpka9K0X3ahdU%2BLVuQW8d5yu%2BCanq5sclKqAMsengAH6omao1ZrD4pibR2q85zFpI%2FvryMHhyFYuFhn9%2FwACP68l4T%2BFdL9pxHjttwgMWyvkmQ5FDpY7AyBcA6HmfcJYCid5%2Fg4Tywv8qMkhqm1ihIxRYbEJqCElBeqYQ2%2Fb2E%2BKj9TStGE3bxjMzcXwmXco%2BKwgmSF2imBEyA6MpopN%2FTCXheh77Igc33bFQ9VieTdwbtuYPZk8NypRn%2Buhca7wSV%2ByD21%2FRKXKXqQJI%2FbJ8X8gOty7dD7bnCRGlY0fdEVxA1PMkLdVugxDfg5jIvsIoqs3I1S6Q9xyQfU7kYdpjYf10%2F945wrK9l1xDiBKC8U%2BKgJ3P1ltGikKst4pkj3sYdTJRacUaz329jROfwleHoNWXoP%2Bq24PEIqsitR7acwXUBk2swobtYZP%2B7g38uzeT9NzduPLhwjZTia4C8jNbFMikFDZU8tTbsD2zfBArSDqv4ihS8uvCBA2oXG4m%2BOvwKGBgWiDE63CWFhCY8TFMsES9s%2Fb2VI9gyo8EXrpzN6m6WMjZ6VPSbrYhdDSQC6pyDtgJqtio%2FJC76Zpe%2B8mXXb9XMDTSQdG915GOmN8Hm3OPSf08xQ1ngTgeElWHVH8fkzbOJ5hyQdiMqhIYwc8ZF5J%2FLfaplu1RrU36H6FYQ97IC7gn8zuFH36p%2BlezTU0mX%2FNEFvQSoFVPaLFMfrSaQYZ1UkxzRIRCJo%2Fl6F8i7Z57IMnZXX3JbvcVipzZwB5MgE3euSgKfTSq4gTfKSPqvkiZaWCnvzVn3QjCJhSV2R4BPwiVNGOqzSeLua3rTNy2jFBakRechVGA2pnp7%2F5k8dEWfh6hYPVamDiAi%2FJa8LEkD7wLACbUxvGi4yIQzlkVUEzmgUAUGkgqy2cKeRsFLYZJisfMMHBebeap8hM4YkXu3EKl9Ivp%2FMRnVuEjxUf%2B0hbv6AZh7RavhyTDp4fEyjIKywRW598Npa75QOL%2BI8Cp8UK13OBUeyc2oFSq%2FY5hXuChJFzmOpI9hAIesHygsW6gu%2BhZ6ZnMZPk%2BxtEFb1BafZChsvKFwR0CNb0dTsbNr7c8YL271gWXBJp1FhIOAh4psJ%2F3GD9Hv7e2heVxDHuszRW3Hn5cp6hj79idUvWnH2IsCZpfYTcyRKsbpoTuYAY5jUcexPoCR5nTWpnyHs1UV5dRSuP0ET3m2HrbKK7lGXYUR%2BDiu8qCtvCmEfOP%2FzFVWqnQBt%2Fsbyg1QzmdPtvt5Vpvm1hdhNKncVkpgoJVOFLAV4%2BVMVQU0JDXUNqs54%2FdASlbPYgrZ94rvfyWW0BTyax7anz8kfpRUdoiS6lgYw3LOF142CQQmTVdNoxT9nrsoxAYcvrFZi%2F7XuIq%2Fazufkuyjo7cwC7gN%2BpBRdsa%2FZIHozt%2FYoVYiW6poV8cmEQFez5wxGG0NC2%2FAuYA0oFG1p%2BSrKWlHdlSZjv4wZWj8mM%2FYzPmqC2nbBox%2F1WYxVT8OILhvOhixVcK%2Bfbl%2FqmIpqISgty6O8%2F5Mo9VNTPZceSjbnJsKjcdtlHVN1x1rU%2FMoGiuv3eYdQnN9hmBT1Cldf8F2UVcRkkfL%2FhSjGipd3yyqk6YYkGPeVEsY05myImHYVn8geE%2BzTcV%2BOpB0PgKK3Nlg2ZocFnz6%2FlKiFdxILyeutvTUArUxFUTsH6bOhPgVOi6wygjCUA13xMQfwxNZYarqzVBSVrRWIOmOzrkSTwYeoudfIebfcRyi4BMXvH9HoHmpL0g0csW5mM5YzcFFWUEArIl5cqkLLwMiYff9sVg2ukOq4SDIiaJBg8W%2BteM8soZSo8o9JnD%2F5cHA0q7o3rqmube%2Fq8GgQH0hJsSwSHvb4ZZa9bKmFeSfnfzVX3of8RsfMYso6wSrOWJvNjWBUHfr4Pm2dfRxiXua4xjuJFzQw2WmpOqQW3%2FxCxwt8rHQPQQL%2Bv%2Fki6MLu4%2BAQEfLPNlXLeMQVI4F05J%2B2BID0ojjyMXuLMnKeB6kqmDW6OEVjaZk5KERi%2BaPl2GXeUceOlhzm1Ro%2BjTjWejwcnjQk3l0fkDff%2BL%2FVu3Zpzm6%2BSsOVuFbhlpXdIXzx9sSiUk5Fxz9UxZ5e9V4r45CacuRHOHGyiz%2FXE8MMV9ZIioFOZThBUNwxuztgqAhNunuOhK3phoh%2BNg9cz3wu77fYsheXsT87yOtepQ0jfzDNajpZ3hjDRa6prB8K%2BoHmimBJiNMG4dw3%2FnQ1XD6bIJeuE2Csq%2BRRe04X7NKVBAkru4kn8zx2D9sPkd%2FJVf%2Bzx6gQjKGlKdrx%2FbSN4Ilm7ePVWDtFewkof2D6yWvNTqzP5xFxMsF8sBe0lAew6RwsJDsqY9KI4KoQlBK1Gdy3yuzLH0Z3FwGO6wlabN%2FSf5x2w8YoqPAerhfolabLmDXj8XayJinMayoZRScSR14223iPJBqUtMlT7iOWHTM0812O0lS4yoqXzxktd100ZszvnJ01KOPIOSSfR8ANDcCJEaZsDFrsDhLj8oPcrBRUC4PYU7xkZgWtqDFTriTvfOQEcFR7nsEVrJ1FzS0G62ed6%2FNN42S1%2FEmsncAJOCr7CvZEJUba7kUHVhTbPjJZbZedE%2BzAx8h99z3qj1mTdjLFVr2NTgdulPBtkiWXenFAoBWNpJPj2XQ7qjSVgey072UDZdDqzrqlu%2BBdFF69vKFc%2FlnJZ7IB7F%2BGENIecdWHpBK0nbU%2BvCE6vQzA4cV4YwNR6vzJtNWRolr1zB5IqQu4ZeKk223hfQz76aYgQhYvjHM%2BUW1l6X7FcwTvOCrE3mbwgHLwcIB1tP03zMOGctY3%2BeNUT9ln8HW2TJHd9kF9pKsoOcUNwLK5lhSM%2BSebegYDgUTDZo%2B0zBWnjG4PjLV8dJaBqv5%2FPRXbho33gudPugAwLa5Xj0jg90zIth9KRtIi12jsQkorFX6UzgQivqJH3HFptNcGhyxMO89Z4IKdXVlI7cjj7BrgHyUD4dzNpDfRSLsew7jhpsCXvh7F4OqCv0Sgx2aXaNdBkQEgsZVzAsrndhbguEi1LzhzCFjEAZ0TVNJXCIAmklup5Pp1NWAwpCd%2F9NbiYygSy%2F9aqOfKonjkA3inTkvWIUZXeR7XXNzcZxFwCnaNovIaU1p3v%2BVecRvqOFB6NVfMZpiI05EtEmyj%2BHZgMSkDAf7S7y%2FrRkHTHrOPgWYoDWOfghcjrDrpuk%2FcMTvcCxtUx3q8mSe665fBjNuWtq%2BD3GWhoxRyi2uNreR9bjcKU172GIessnc8zLkzt%2FamQIWz48t9duZ8RESQuU0Ib9clXf3ZovD2wYPyil92Lao9ZGRU1x1F8Xe3dC0DzxGHXck35JBic6mPt2N6RxZpV3B3s1ku6GjPZY6Cx4Y24NyX7PAOp%2Fc%2BXQMneV8%2FQnWJ6DSYdDSXf5%2Fhz%2F9f6kZZPnnXwuAkeM1tw1MLtV7XIR%2FRC01%2FBoNY%2FYt3tNJ5VodthStS7xNpMkYpTQxlmyj%2BRCGmH0t6PZ8jv2oa8CG52udvoSZ0RbLNCar2%2FfqzVMOfYEuwzBmQex6QNJFaMnRYMonr2nVg0BCj0jRat1eo3lF2pqPcExJyed3r0BQGPvVc%2F3%2Bw0Bp77kUe5aZsdF5PU8yOMYqMKypF3uMVn3XPO5WzeduvRSF1xvZZ3dMaNDwKyaohR5ZP%2BigfmcLV9doAvq4kUTjaE2VOqXmn0grBZw5XHBrd2l0wyWlwwJKYX%2F3glkMfggCmf80d0X4gVQ6WUZFsQjgIYoQ2Tim2eD0HVIKFZ8ki2krGCAkMk%2FFyuWJCcoo9TkhofK8o6pEvZuIoII4OtJIq3wtgJhLtKuOBqxfiOjLuWF5D1TSiiQ21LKfi569YgQf5aynHfTyRHz%2BG4gHnK6fy%2Fg5gro2%2BlI3klgD2Gf0CABOSfszLbYQUuaUjYZ%2BroGRttoklyvYKzXJHitn1xXnPiD81%2F7YgorvJt0PeQjmXrVbu6lFYqn3AM2R2fMI76QmYs95Mi31gttvrLxn2rKkgPBcnxf16AyQXu0%2FemDRsumbKMYKHo2sN8iOIkSnOVEYlsvorwB%2FlhV8JBcfVaX5FyQ6UwrV%2BD35ej2Mbds7M17wcT%2FmggNuMWDQ8cOujVYea3oV7Hu2N0FdNge5Y%2BHi4gxBS8WCHmr7vqXgNgymy3SIswPyt9b4tJ9O1vRWCmTsGTbpUovpEG1LkKH8IOS%2B4z3xQ4QDnVIopg1HQO7%2BSxlTwfvLPUCfAawxK8wY1fTtuDF%2BcwNcvqWQtHuc6zVwd8SZHgxEsCnR2uatYVnkMuX6mU9AeakeFyMkLHkpbA314Ygk8xqw22MnzsTImH7WBTThAWUu%2FAi%2B1F2Krl%2Bv5Ip8OJXenvRkRRQE%2BeNFCfQWn9cTkZCOOa4yI7jnd7vT3F5zd%2BZU5JTMpu%2FDfux35GNwCX5O8pq4aL2V9yRn%2FzjuUQz05ucxUVSP2jEazbRE4pRV7MJ%2FICnUBXnceb3AyDbwQpGT1BZkI5S33dNHHi3DvCJ62SIzD2CRV9S9O8RT9qH0I8FOr4g3lsQKEOu02wT8Gy%2F6nEnXw9ADZ%2BBDWSd57naThcxmshHiJZqGIxZzaGOEBjt4%2FMx6md9XItpwL%2F5Std1Nq7LAN9iKGaFnfGTee5ClR7Oxqz0JI4lvcmlWIX1eMMiZ5cH4GbXV77aLzcSknkIcIvXH4Po%2FVCXre95YhjGfmK3ULrHFQ9vQuxXl1elErBmMcc10kkKzHM7Vlccym8y4rS0yhwQFww0qPVBMW2i8l8cZUn71XZJTVJ7KKP%2BrjD%2F55Eg810A4IH%2F4ftBCsKNvwRZRLBbSXdCPqqIZugxHsZn4mzGHvSkJNOaTS5qAJTlF%2By5%2BszNlVDaulDK6zMqoqfEzFHwj4xa3jn%2BCSnMb19vd4zrnkxWk%3D&sbForm%3AdoFindByName=sbForm%3AdoFindByName&',
    'method': 'POST',
    'mode': 'cors',
  }

  const response = await 取得網頁資料('https://www.starbucks.com.tw/stores/storesearch.jspx', ApiParams)
  const 門市名稱列表 = parse(response)
    .querySelectorAll('.store_name')
    .map(x => x.childNodes[0].rawText)

  const 門市地址列表 = parse(response)
    .querySelectorAll('.store_add')
    .map(x => x.childNodes[0].rawText)

  const 輸出檔名 = '資料/星巴克.tsv'
  建立輸出檔案(輸出檔名)
  for (let i = 0; i < 門市名稱列表.length; i++) {
    輸出結果(輸出檔名, `星巴克\t${門市名稱列表[i]}\t${門市地址列表[i]}`)
  }
})()

//--- END ---

function 建立輸出檔案 (檔案名稱) {
  fs.writeFileSync(檔案名稱, '', { flag: 'w+' })
  const 欄位名稱 = '類別\t名稱\t地址'
  fs.writeFileSync(檔案名稱, 欄位名稱 + '\r\n', { flag: 'a' })
}

function 輸出結果 (檔案名稱, 結果) {
  console.log(結果)
  fs.writeFileSync(檔案名稱, 結果 + '\r\n', { flag: 'a' })
}

async function 取得網頁資料 (網址, 參數) {
  return (await fetch(網址, 參數 || {})).text()
}
