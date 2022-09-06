

M.loadCss("/memberhtml/simu/views/geren_skq/geren_skq.css")

const pub_skq_status_enum={
    move_up:"move_up",
    move_down:"move_down",
    pause:"pause",
    position:"position",
    offline:"offline"
}

const template=`
<div v-cloak id="shoukongqi"
    @touchcancel="main_contol_wrap_touchend"
    @touchend="main_contol_wrap_touchend">
    <div class="monitor_wrap"   >
            <div class="monitor_title">
               <div>力峰值(KN)</div>
               <div>速度(mm/m)</div>
            </div>
           <div class="monitor_title1">
              <div class="monitor_title1_lifeng" style="color: rgb(238,228,176) ">0.0000</div>
              <div class="monitor_title1_icon_div">
               <img class="monitor_title1_icon_img" :src="skqStatusImg">
              </div>
             <div class="monitor_title1_speed" style="color: rgb(0,170,237)">0.00</div>
           </div>
            <div class="monitor_title2">
                 <div class="monitor_title2_line_li">
                    <div class="monitor_title2_li">力</div> 
                    <div class="monitor_title2_li_val">0.000
                        <span style="font-size: 3vw">kN</span> 
                    </div> 
                </div>
                <div  class="monitor_title2_line_weiyi">
                    <div class="monitor_title2_weiyi">位移</div> 
                    <div class="monitor_title2_weiyi_val">{{dispFormatValue}}
                      <span style="font-size: 3vw">mm</span>
                    </div> 
                </div>
            </div>
    </div> 
    <div  class="main_contol_wrap">
           <svg 
                 @touchstart="AtsPushButton('move_up')"
                 class="move_upImg defaultImg"    
                 viewBox="0 0 145 145"
                 xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink"
                 width="101px" height="101px">
                <image  x="0px" y="0px" width="101px" height="101px"  xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGUAAABlCAMAAABjot39AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABklBMVEUGBgZmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pluWlOjVE0XTYhOCISHRMMEQwGBgZeq2EQGBBkt2g4ZTsKDQpYoVsYKBlPkFIMEg0YKRljtmderGIKDgoPGBBOjlEhOSILEAsHBwcvVDFXn1pjtWcwVTI/cUEsTS0sTi4ZKRpZo10GBwZJhEszWjUdMh4PFw9dqmEHCAdPj1I6ZzwkPiVmumoTHhNgsGQJDAlUmFdAdEMqSiwYJxhitGZYoFtHgEkxVzMxVjIdMR4OFg9cqF9Ni1A4ZDoiOyMhOiNfrmMSHBIICghSllY+cEEoRyoVIhVis2ZIg0tIgktjtWYVIxZhsmU0XDVNjFAgOCH///8wjbW3AAAANHRSTlMAKmuexuTwIILdJKD7CIH3+CXPQ/FT+VJCJs6mIv0jh4jg4Stsn8Xn8uUBp4NVSEmi3sfm9kHJ+AAAAAFiS0dEhRXXaucAAAAHdElNRQfmBgkJGSPINwvwAAADU0lEQVRo3u3a+VcSURQH8Kei4hoqmUvZApQtlsvFcRgFNzRT06wETVTE3XKhzK1y/cPjvRkQcMCZx3tTP8z3l+Gg537OebMwM/cilJa8/AJLYRHQpqjQUpCfh7Km2FpCXT85JdbijEZpWTkTA6e8rFTVqKi8w8zAsVVW3ESqqpkaONVV6UiNXfmTu1PoEj0SbTxil9DpVmrZa1KRu7Xy991CDzVwnR6hWy5Xey8ZqZMRr6+XgYHT6/PKTF3SPpHPj75+RgZOfx+pWVSfOLoayBcDgwwRSRocIFUb4kdapYywWq3EqsmMVTkZbWS56I+rTPGQRbPJp2cj2fF+5ogk+Ydw6UaM3CeXFR8HRJJ8uPSDppjyEH8afstF6R3GxR/FlMf4g8AFkSQBF3+CkINcVkY4KSPkYuNA+XjzjhMiSZ24vBO5eC6YsmQu9BRvRrkpo7i8BT3DG5GbIuLyhYhcjce4KWPkdwaRaw03RJJIfVMxFVMxFS0Zfz8xOfFhnLMyRf5/iq/yUbmb/8RT8U8qyuRnfopnOvEENK31VlS3EggmPWgFA5yUmZTnuRk+yqw7RXHP8lC+zEFq5jTdKupTQvOQnvkQc2UBbmaBtbIYVlHCi2yVpQioJbLEUlleAfWsLDNUViFTVtkpa5A5a6yU9Y0sysY6G8WzCdmy6WGhBLYge7YCDJSvcFu+5a5se29VvNu5Kju7tyIAuzu5KaE9DQjAXignJaoJAYjmonwPa1TCP+gVcV8jArD/k1Y5ONSMABweUCpHOhCAIzrlWBcCcEyjnGzoVH6dUCi/dSIAfyiUU93KKYWid8FiPzWGrFiQZu9HdCKRM5oj+Sx4rsM4D6oi//PTq6mYiqlwV4x4N95syHv+58iCN6PclC5c3mJQ/8WJN9x7Scb0xYzo8b2I9ytZN5HlXPcrmzj2XsmDCem9yn3kIX595JdJPfFNDj1x8ghvU2Y8rORaw76/L79RexWfVZCHVPjMKlQnpmLqjZi7uJ4hiTKbIYnenCFBqIXtPMxFfB6mJXXs5rVduRN1XwpXIv3vzZh4JVzGXwk3v/knc0qxI81qY2rUWlVmrvDp2cpwfqxVfX5MnoVrY2K0ZZmFI3E4Xe0ddur69o52l9ORXvQvJyOR1jkOyTgAAAAASUVORK5CYII=" />
               
              </svg>
           <svg 
                     class="move_upImg activeImg"    
                     viewBox="0 0 145 145"
                     xmlns="http://www.w3.org/2000/svg"
                     xmlns:xlink="http://www.w3.org/1999/xlink"
                     width="101px" height="101px">
                <image   x="0px" y="0px" width="101px" height="101px"  xlink:href="data:img/png;base64,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" /> 
              </svg>
           <svg 
                 @touchstart="AtsPushButton('stop')" 
                 class="stopImg defaultImg"    
                 viewBox="0 0 145 145"
                 xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink"
                 width="101px" height="101px">
                  <image  x="0px" y="0px" width="101px" height="101px"  xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGUAAABlCAMAAABjot39AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABR1BMVEUGBgZmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pluWlOjVE0XTYhOCISHRMMEQwGBgZeq2EQGBBkt2g4ZTsKDQpYoVsYKBlPkFIMEg0YKRljtmderGIKDgoPGBBOjlEhOSILEAsuEA6MJiDRNy7wPjT3QDXQNy0MBweSKCH1QDWWKSIPCAi3MSi5MSmTKCEvEA70PzSNJyDxPzTsPTPONi2OJyEwEA7SNy7yPzTtPTM4ZDpYoFtPj1I0XDVNjFAgOCH///+hSUBUAAAANHRSTlMAKmuexuTwIILdJKD7CIH3+CXPQ/FT+VJCJs6mIv0jh4jg4Stsn8Xn8uUBp4NVSEmi3sfm9kHJ+AAAAAFiS0dEbMwBMDsAAAAHdElNRQfmBgkLCRQ5zGjAAAACuElEQVRo3u3a+VPaQBQH8BUDxotGTKlHq61Aaw9bLwhhVfDWgmKK9hC1Qlts9f//vbzdBBCBknU3HWf2/RImzHw/M0uyTPIeQk3V4+tV/IFl1gr4lV5fD+pYfWo/c35j9at9bY2BwSEuBtTQ4EBLYzj4iJsBpQWH7yIjIa4GVGikGRnV7a/iCSNppjBrpcykkYjbWfrobeRxmJ5fMVaZgXqtGis0LvykERmjyFo6w8GAyqTXKDPW8JvQ+2N9g5MBtbFOMgPjtatrgpzY3OKIYLy1SVInnCstSBFeq1VbNcqo9s2okeViv67aVYosmkZvz0nyw29zRzDe3oHoSUCekm0lLQDBOA3Rz6aqyjR82t0TomR2Ifx5VXkBHwwhCMYGhM8gFCHbyr4gZZ9sNhHkg8NHQQjGCYiPopjIBbOXLIZewiErTMlCvIJewcEUppgQ70dkN84JU3LkfwaRvUYYgjHJl8rDVA4O80dW5zr6dHhwL6VwfGJ1Uyefv7Arha9dGVDfCszKadeIZR2zKsUzF8pZkVE5d4FY1jmjknel5BmVC1fKBaPiCrEsqUhFKlKRilSkIhWpSEUqD0xx92TxnVFx95R0yai4e+IrMSplV0+vZUbF1ZP4KWZVvHmr4M0bkmoVSz9+/oP4dVkqtw/oSrl3SUUqXrwbn/XkPf9rpMAhK0xJQrziUf8lCgfhvSRv+mJe9PjeOP1K3k1kWvV+5ZTA3msFoknvlfaRd8T1kd829MSvBPTEryBYs2c8VLLX8O/v/ya575xZBTqkImZWIVSbihn3Yu6iPkNS4TZDUrk7Q4LQHN95mD/OPMzc7bGb9zo9vxy/Nm5M9v+bnHljXDuzPbMf/sucUvVKUzWuRlhtMXMFt+c8x/mx+dbzY3QWboGLsdBhFo5UJBpbXNKZ8/WlxVg00hz6F+s+U+O2CXWbAAAAAElFTkSuQmCC" />

              </svg>
           <svg 
                     class="stopImg activeImg"    
                     viewBox="0 0 145 145"
                     xmlns="http://www.w3.org/2000/svg"
                     xmlns:xlink="http://www.w3.org/1999/xlink"
                     width="101px" height="101px">
                 <image  x="0px" y="0px" width="101px" height="101px"  xlink:href="data:img/png;base64,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" />

              </svg>
           <svg 
                 @touchstart="AtsPushButton('move_down')" 
                 class="move_downImg defaultImg"    
                 viewBox="0 0 145 145"
                 xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink"
                 width="101px" height="101px">
                <image  x="0px" y="0px" width="101px" height="101px"  xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGUAAABlCAMAAABjot39AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABiVBMVEUGBgZmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pluWlOjVE0XTYhOCISHRMMEQwGBgZeq2EQGBBkt2g4ZTsKDQpYoVsYKBlPkFIMEg0YKRljtmderGIKDgoPGBBOjlEhOSILEAsVIxZIgkthsWVIgkoVIhZgsGQWJBZJhEtis2ZFfUhGf0kkPiVmumo6aDwICQhdq2EfNSAeNB8GBwZKhk0NEw1apV4aLBsuUjBFfUcLDwtXn1pitGYoRyo/cUEJCwlTl1Zgr2MjPSQ5ZzsHCAdPj1JdqmEeMx8zWzU0XDVJhUxapF0ZKhouUS9BdUMwVTJjtWdXn1s4ZDpYoFtNjFAgOCH///+Xvz+QAAAANHRSTlMAKmuexuTwIILdJKD7CIH3+CXPQ/FT+VJCJs6mIv0jh4jg4Stsn8Xn8uUBp4NVSEmi3sfm9kHJ+AAAAAFiS0dEgouz/0QAAAAHdElNRQfmBgkLCwuG8ge3AAADZklEQVRo3u3a51caQRAA8FVRsQaVGEs6kJhiYsPzHAUVS4waE0tiS7D3buyJ5T+Pu8shIHC7yy7xw82X4wE7v/f27vbKDEIxkZGZZcvOaRKNnGxbVmYGShq59jzh/JGRZ89NaOQXFEoxcBQW5Mc1ioofSDNwOIqL7iIlpVINHKUlsUiZM/STt1lr0VtBNFr1Fq3ZG8rlLItGHpbT79u0dmHgNtq1Npqu/FEkUkERn79DgoGjw++jTEXEPqHnR2eXJANHVyfJmVMZPrqqyBeBbokIQHeAZK0yjrRiisiarfCsUcYeOhkdZLrEj6tE0UomzUFPz2qy43ukIwA9vTh1NUYek2XFrwAB8OPUT57eKM/wp75PSpSOPpz8+Y3yAn/QlCAAGk7+EiEXWVb6FSn9ZLFxoUy8+awIAWjG6d3Io3LCQlPmQa/wZkCZMoDT29BrvNGVKTpOn43IajyoTBkk1xlE1hplCADJbymWYimWEhNDX4Y5br2Hvw6JKN9GOG/xR0YFlDFOpKlpTEAZ51bG763ynVv5IaDo3HtfF1BgYpILmZwQOZIBpriUKRBTpgMcSGBaUIH2GWZkJtFTr7kCP72MiPcXiCv0BpQhEt8CsyjBWSZkNpiSAnPzDMj8HKSmwILPFPEtQKoKLJoqi5C6AksmyBLIUJZXkiIry1IUGF1NgqyOghwF1pIoayBLgfWEyLrZUA5lYzMBsrkhUQF9Ky6yZf5AyqPAdrxL2uS2+UAuBXbiKDsM4/iU3b07yN6udAX692OQfaaXN5wKHERf0rwHTKN4FfgdpRyyDeJWgkcRyFGQbRC3At3HYeSY9bUwvwInxiXNd8I6RECB05ByyjxCRIEz8v8z9gFCyu75yp+/5yynYyoKd1iKpVjK/VTS8W68Ji3v+d8gG94MKFNacHpbmuovbrxRXktKT10sHTW+t0a9UnYRmcZtvfKpwtrrBU5Naq+0jtyrro78LqImfqmgJn6JEztCPR52stbIr+/TZ5H3Rq8CbVJR06tQGu6KqUxH38VtD8mFtB6Si7s9JAjVyu2HOTT6YWqj224+OI1HrCvtWhe/3gzq19qV8dBW8/G/9CndHGl2h1Sj3B6n5wqfnnUS+8fq4veP0V64eilGfZJeOBIut6eh0Smc39nY4HG7YpP+A7rij5qDIzjQAAAAAElFTkSuQmCC" />

              </svg>
           <svg 
             class="move_downImg activeImg"    
             viewBox="0 0 145 145"
             xmlns="http://www.w3.org/2000/svg"
             xmlns:xlink="http://www.w3.org/1999/xlink"
             width="101px" height="101px">
         <image  x="0px" y="0px" width="101px" height="101px"  xlink:href="data:img/png;base64,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" />

              </svg>
           <svg 
             @touchstart="AtsPushButton('minus')" 
             class="minusImg defaultImg"    
             viewBox="0 0 145 145"
             xmlns="http://www.w3.org/2000/svg"
             xmlns:xlink="http://www.w3.org/1999/xlink"
             width="101px" height="101px">
            <image  x="0px" y="0px" width="101px" height="101px"  xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGUAAABlCAMAAABjot39AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABCFBMVEUGBgZmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pluWlOjVE0XTYhOCISHRMMEQwGBgZeq2EQGBBkt2g4ZTsKDQpYoVsYKBlPkFIMEg0YKRljtmderGIKDgoPGBBOjlEhOSILEAs4aDo+c0ArUCxTmVc4ZDpYoFtPj1I0XDVNjFAgOCH///8ygvzjAAAANHRSTlMAKmuexuTwIILdJKD7CIH3+CXPQ/FT+VJCJs6mIv0jh4jg4Stsn8Xn8uUBp4NVSEmi3sfm9kHJ+AAAAAFiS0dEV30K2R8AAAAHdElNRQfmBgkLDCBlD2gwAAACQElEQVRo3u2aWU/CQBSFRyxYN6xYcV8B912hlFFBwRVccPv/P0XunRYQkMRmbn2552WaNjlfMp2ZJj1HiA4NRAaNaOwsqGJRYzAyIPpqyBwO7N+uYXPoV8bI6JgWBmhsdKQnYzw+oY0BsuLj3ZDJhFYGKDHZCZmyvUfZnJN3CzKoCm7eyWU9L3vqJ2Q6qe6fOxeBAS1dOOfKLjnTDplVkMtiSQMDVCpeKsxs2ztR++PqWhMDdH2FnrG55uqaxxvlikaIlJUyus77Ky2uILpmqzlrCmN6m9HC6Qq+rn5TASfNUttzAV/8jXaIlDe3YL0AkEU8VooEECmLYL203KCswNXdPQmldAfmqw3KGlw4JBApHTBfFyKFx8oDEeUBD5uUiMDwSASRMgf2aZGhnDBvyjJiA4YqGaUK9obYhMElo7hgHxV4GtfIKDX8zgg8a8ggUqI/U5jCFKYwhSlMYUp4lKfnP+glKOX17A96ZgpTmEJPCWfvaxFTmMIUpjCFKUxhClP6U8L4N74Vyn/+bWHAUCWj5MHeCCl/ScNAniWFk4uFkfHt+Hml7hBZqZVXLhNmr3WwxuxV5ci3dDnyblsm/kaQib+BseV1PEw8a/Tn++/ou+d3FVRJhaarkGi2YubC6F20OiR1bR2SeneHRIh9vX2YD78Ps/+zdnNge/8gsp/Olxv8e1Nzv5xPv9uzdfgvPaXGSjMtrYyk2aNzBdvzSGN/7Kh3f0x14Y61MI77dOFQqXTm5NQO7G+fnmTSqU7Tb5n7l4/Seq2DAAAAAElFTkSuQmCC" />

          </svg>
           <svg 
                 class="minusImg activeImg"    
                 viewBox="0 0 145 145"
                 xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink"
                 width="101px" height="101px">
              <image  x="0px" y="0px" width="101px" height="101px"  xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGUAAABlCAMAAABjot39AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAB6VBMVEUGBgZmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pluWlOjVE0XTYhOCISHRMMEQwGBgZeq2EQGBBkt2g4ZTsKDQpYoVsYKBlPkFIMEg0YKRljtmderGIKDgoPGBBOjlEhOSILEAsICAgKCgoLCwsHBwcJCQkSEhIbGxshISEjIyMYGBgREREyMjJBQUFISEhJSUlHR0c/Pz8zMzMeHh5RUVFmZmZubm5vb29tbW1kZGRUVFQ4ODhCQkKEhISUlJSWlpaTk5OHh4dsbGwMDAwnJydOTk5ycnKXl5fC88TC8cW/8cKz5bV4eHgrKysNDQ0ODg4tLS16enqfn5+q6K2L4I+18bh8fHxXV1cwMDAqKip2dnacnJy08bcPDw9GRkZra2uLi4u287mq3KxwcHBLS0smJiYWFhZaWlpxcXF7e3teXl4cHBwkJCQ9PT0oKCguLi44ZDpYoFtPj1I0XDVNjFAgOCH///+vhhi5AAAANHRSTlMAKmuexuTwIILdJKD7CIH3+CXPQ/FT+VJCJs6mIv0jh4jg4Stsn8Xn8uUBp4NVSEmi3sfm9kHJ+AAAAAFiS0dEorDd34wAAAAHdElNRQfmBgkLDR0kfBVgAAADD0lEQVRo3u2a6VMTMQDFAxRYTgtU5FA82ioeKPd2CdByi4VCoVBEEfAo3oC3UEQOlXoBXvUAhf9UkrSllIK7O8nqjHlfsrM7834z2SQ7s+8BEKGY2DhdfEK5WiXE6+JiY8CuShSSVPuHK0lI3JGRnJJKhYGUmpIclZGWvocaA0mfnrYdkpFJlYGUmREJyTIEHlVUihapCqpVlWQRKysCXoasrZC92eR+tVijGrCpGrGa2GXvC4fkEEit1UaBgWSz1hJMTtg7Ifujrp4SA6m+Dnsm5IZWVx6+0dBIEQJhYwN2zQuutHQCoTVboVkjGCGwGfV4utSvq51UhSdNT7ZnPn7xTdQhEDY1I+t8BNmPjxUrAwiEVmR9oGCDchBdtZxlQrG1IPNDG5TD6EJkAoFQROZHADDiY6WVEaUVHzZGEIuGc4wgEFYiexMws5ywwJSZwVE02JlR7MheB46hQWJGkZB9PMCncRszShv+zgB81jCDQIj9OYVTOIVTOIVTNKa0Ozrky9GpiuLs6nb1yJer1+1QTnF2953vvyBfFwcuDToUU7r6hoYvX5Gvq9c8I71KKc7B68M3bt6Sr9t37vb3tCukjI6N37v/4KF8PXr8ZOjphELKpNcz9Wz6uQLNzM7NuzmFU/5LysSLoZevFFEWpjxen0KKw/X6zdt3M/K18H5xadmpkNL5YeTjp8+z8jW1+GXADxVS4OjXb+OeOfnyLA189ymmwEn/2I95+fIu+6NC/vhF7vC55cvnhFAVhY44hVM4hVM4hVM45d+haPFvvFCT//zHgQ4NdmYUC7LXaZS/mNDAPEvSJhfTIuM7EcwraYfIRJt5ZQHD7HUFWePsleTIzexy5JNhmfgqg0x8FRnrAx0PAZ819PP9n9j3VLCrQEoqbLoKmaFWTK4WvYvNDskKtQ7JyvYOCQBFdPswv4J9mKKttZvTBnK/vGJNXJfUf2/apHVxLdjtKTzzV3pKGytN0FNlZAtROldoexZT7I8VR++PkS5cCRVGyS5dOCyjyVxaZlDtbygrNZuMkaa/ATvtjuWpqdg5AAAAAElFTkSuQmCC" />
          </svg>
           <svg 
                 @touchstart="AtsPushButton('plus')" 
                 class="plusImg defaultImg"    
                 viewBox="0 0 145 145"
                 xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink"
                 width="101px" height="101px">
                            <image  x="0px" y="0px" width="101px" height="101px"  xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGUAAABlCAMAAABjot39AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABAlBMVEUGBgZmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pluWlOjVE0XTYhOCISHRMMEQwGBgZeq2EQGBBkt2g4ZTsKDQpYoVsYKBlPkFIMEg0YKRljtmderGIKDgoPGBBOjlEhOSILEAsrUCw+c0A4ZDpYoFtPj1I0XDVNjFAgOCH///9ochCpAAAANHRSTlMAKmuexuTwIILdJKD7CIH3+CXPQ/FT+VJCJs6mIv0jh4jg4Stsn8Xn8uUBp4NVSEmi3sfm9kHJ+AAAAAFiS0dEVZMEuDMAAAAHdElNRQfmBgkLDghijKJIAAACU0lEQVRo3u2aaVPiQBCGRwwYL4wYWW/dBXbdXd31ghBGBbwVFK///1uW7kkgcrjF1HT0Q79fJpVU3ofqzEyo9CtEj8YS41YydaSrVNIaT4yJdzVhT2r7RzVpTwxlTE3PGGGAZqanBjJm03PGGCAnPdsPmc8YZYAy872QBTe4VCx5Zb8idVXxy16pGHi5C28hi1l1/tg70QZ0deIdK7vslyhkSUFOqzUDDFCteqowS5FnotZH/cwQA3RWR8/Ucmd2reCJ8wuDECkvztF1JZxpaQUxVa1O1RTGDhajg+XSn1fDVMGiOWp5ruKDvzQOkfLyCqxXAbKG20qVACJlFazXN9qUTTi6viGh1K7BfKtN+QoHHglESg/MvwmRw23llohyi5tNTiRguCOCSFkC+7woUBYsKFlBfIehQUZpgL0lfsDgk1F8sE8K3I2bZJQmvmcE7jVkECnRnylMGemW0X4XU5jCFKYwhSkfQrl/6FWX0nfpXpcSMf2/HpjCFKbQU+JZ+0NuGekOpjCFKUxhClM+C0VDTGFKHN/Gt2P5zv9TWDA0yChlsLdi6r/kYSDvJcXTF4ujx/cr7FeabiIrdfuVG4S91xZYY+9V9ZGv6PrIvyM98UeCnvgjGDtBxsPGvcZ8f/8JfXfCrIIKqdBkFTKdVMxyHLmLboakZSxD0urPkAixazYP8xzmYXbfxm7+uMFfoOKL9+rrv2+a/qv3EmZ7tv9+SE6pPdNsxygjaw/IXMHy3DOYH9sbnB9TWbh9I4z9d7JwqFy+cHDoavu7hweFfK7X9B+dKowPaOK4cgAAAABJRU5ErkJggg==" />

              </svg>
           <svg 
                 class="plusImg activeImg"    
                 viewBox="0 0 145 145"
                 xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink"
                 width="101px" height="101px">
              <image  x="0px" y="0px" width="101px" height="101px"  xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGUAAABlCAMAAABjot39AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACIlBMVEUGBgZmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pluWlOjVE0XTYhOCISHRMMEQwGBgZeq2EQGBBkt2g4ZTsKDQpYoVsYKBlPkFIMEg0YKRljtmderGIKDgoPGBBOjlEhOSILEAsHBwcMDAwPDw8SEhIQEBANDQ0JCQkICAgVFRUnJycyMjI4ODg1NTUrKyscHBxISEhXV1ddXV1aWlpOTk46OjofHx9nZ2d8fHyEhISAgIBwcHBUVFQzMzOampqqqqqioqKHh4dlZWU/Pz8bGxuL4I+QkJBra2tFRUUeHh4LCwshISEKCgojIyM8PDxGRkYtLS0YGBgRERFERERJSUliYmJsbGxSUlJHR0dLS0tgYGBqampvb290dHSTk5N4eHhtbW1kZGR+fn6Wlpavr6+fn5/B88PC8cXF8ci/8cKz5bVRUVG18bgwMDC08bd6enq38bq48buq3KwmJiaMjIyVlZWBgYFeXl5YWFhmZmZbW1soKCgZGRkiIiJoaGhCQkI3NzcWFhYODg44ZDpYoFtPj1I0XDVNjFAgOCH///81JFcrAAAANHRSTlMAKmuexuTwIILdJKD7CIH3+CXPQ/FT+VJCJs6mIv0jh4jg4Stsn8Xn8uUBp4NVSEmi3sfm9kHJ+AAAAAFiS0dEtTMOWksAAAAHdElNRQfmBgkLDh6WWBcZAAAD+UlEQVRo3u2a6VPTQBjGIxasCFiwIofiQfFGAYVSVrkVkaNID46WQ+VohVJACwXLIXIJKiqiIB544QGK1x8ou2noJgUlmWxlxjxfNpN35vlNNslum/ehKI42+W2W+QecFqoAf9lmv03UH7VFvlWwP66t8i1rMgK3BYnCgAraFrgqIzhku2gMKEVIsDckNExUBlRYKBeyQ+kuJaeoUzVpQKjSNKnqlGS3l3IHG7IznD5/Rn1WMMCjs+oztF34LhwSQUPSMzJFYEBlZqTTmAjsntDvR1a2SAyo7CzkGRC58nRFoRM5uSJCAMjNQa5RzJMWQkPEmq2VWaMxcvfLqEDTJfy5WktpaNIU9OsZjW78OdEhAJw7D62jIWQ3WlYyCEAAyIDWe2KWKXvhUd4FIpTMPGi+b5myHx6oiUAAUEPzAxQVi5aVfEKUfLTYxFJ+cLhICAJACrRXUXEkJ8w9ZXHUQTgUEKMUQHsZdQgOGmIUDbT3p9BqXEiMUoj2GQqtNcQgACB/HpSiYm0Jo0ulOjIUvcFYVs6ootJUTIJSZCgzV1Uzqqm9fGV9V8OPUmw0X62rZ9TQaLEaCFC0ZVV115oYNdta7K0EKCXl1fVNbStqv37DIVEkikSRKBudouvAZPCidOJlZ5Egil5rcHRhMnZzKDddeLmzp9fJn6I3uLr7+nHV3mJRBm6zqoN2q8PJm6J1DQ2PjLJ0x4ZRxsbZxbv3LOU9vCmG7uH77RNsXXvgoTzk1MZsA+YuPU+KztE30v5okqPHHgq3NPVk/GllKU9KR1f/6MRkGw9N11XN9EoUifJfUpydg3fHpvhQns1aXFqelKIe+z3bk2m2nmPYF5zas5eNQ690PCmg12oZGK9j6f4ctlq+fsMuzja+tZsAX4rTUW5+WoXr3XvWyj86z6pahuwftLwpwNnTVTmDyWrn7GLmCrzsemVaFfLXHVlf2ovpo9eO/Akva9f6Z7ZBfl1IFIkiUSSKjyiXKmoamj2Uuc8LJgKU0sraRls7o7nZ+cUvBCg602VLy3VGn+f7jF8JUEDxFav9BqOFRWPJuiC8v47qDK0ORqYv67sS/hRh8iXFF9/GD/vkO/8RSgaHAmKUVGgv81H/RQUH4r0k3/TFfNHjO8r0K8VuItPy9CtjCPZel6A16r3SfeTz5PrIx7Ce+DcCPfFv0FjhznjI0Vojfn//O/I9zmQV6JAKmaxC2EoqJtIXuQtPhmRJtAzJkneGhKLixc3D/GDyMPHs2M0JJX3+dPJP9S+N8P2mUPNL/ZPJ9hw++U9ySstPmlwhKiNcvkrmCr6eCSLmxxJWz4/RWbhEURiJf8jCIcWq4pJOKQX7K08lxaliuaa/Aau9E9AVDM70AAAAAElFTkSuQmCC" />
           </svg>
    </div>
    <div class="tail_contol_wrap">
              <svg 
                 @touchstart="AtsPushButton('position')" 
                 class="positionImg defaultImg"    
                 viewBox="0 0 145 145"
                 xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink"
                 width="101px" height="101px">
                     <image  x="0px" y="0px" width="101px" height="101px"  xlink:href="data:img/png;base64,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" />
              </svg>
             <svg 
                 class="positionImg activeImg"    
                 viewBox="0 0 145 145"
                 xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink"
                 width="101px" height="101px">
               <image  x="0px" y="0px" width="101px" height="101px"  xlink:href="data:img/png;base64,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" />
           </svg>
         
             <svg 
                 @touchstart="AtsPushButton('zero')" 
                 class="zeroImg defaultImg"    
                 viewBox="0 0 145 145"
                 xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink"
                 width="101px" height="101px">
                    <image  x="0px" y="0px" width="101px" height="101px"  xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGUAAABlCAMAAABjot39AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABJlBMVEUGBgZmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pluWlOjVE0XTYhOCISHRMMEQwGBgZeq2EQGBBkt2g4ZTsKDQpYoVsYKBlPkFIMEg0YKRljtmderGIKDgoPGBBOjlEhOSILEAs+c0BOkFFYolwbMhw4aDpJh0xDfUYrUCxTmVdis2UjQiURIBJdq2ExXDM4ZDpYoFtPj1I0XDVNjFAgOCH///8Il+0xAAAANHRSTlMAKmuexuTwIILdJKD7CIH3+CXPQ/FT+VJCJs6mIv0jh4jg4Stsn8Xn8uUBp4NVSEmi3sfm9kHJ+AAAAAFiS0dEYbKwTIYAAAAHdElNRQfmBgkLHSrWA6I+AAADdElEQVRo3u2aaVfaQBSGR0XFjaJS69JqW6C1i60LEOOo4F4LiOAGaKv//1eUOxMg203GnJn09DT3SwK88z7JZLYwlxBbDAwOxYZHckFjZDg2NDhAPGM0PhbY3xxj8VGUMT4xKYUBMTkx7sqYSryQxoBIJqackOkZqQyImWk7ZDZl/JQvaNv6Dg0aO/q2VsgbXqlZK+TlHP9+V9sLDOjHnrbL7eZemSHzHLJfLElgQJSK+xwzb3omvH8cHEpiQBweMM+RhV7rWmRfHB1LhFB6fMRcF7stLcEhsmqrV2scEzc6Y5JVV/B2hcUOq7Qk755L7MGfSIdQenIK1ksAec2GlaICCKVFsH6z3KGswNnZDyWU0hmYv+1Q3sGJpgRCqQbm7wlJs2HlXBHlnA02aTIIh5+KIJQWwD5DsiorzKiyLPkAh7IyShnsY+QjHHRlFB3shwkbjSvKKBU2zxA21iiDUMr8I0pEiSj/DqV6Ab/Uqpc+Nj46T0q9v6hueDF8dV6UhnntXsNvx1/nQbmyviLUMIiADqdc299ErtwhIjqccmMvnXOvMxEdSjEu8bbeOa153IyQDqUYtX0H580Wd/J4Kt46lHLLvrvgH+omKxpAh1Euub7NPzW5V9UJEdNhlLb1Qd6Yr/j5OoxStdZwA+sKYjqMwuUtxOy5OozCb/3GWjrXdFDEdIKUOtbfxHQYpeVa2tmUxXTelIat9DVC8dP9PxTVzyWcNhZOfwmn74czjtWtt85nQZcxWUyHUe54ad/5RUyHUcKZK+mFuYDHvC+kQynGJMjWJsZiqLs2MZqrr06AYlyXOS7dKB46EUrbXrh3iVYKrhOhONa/TXcKrhOiWIu3+vVgo6A6MQpt3/YKN0xXaKdgOkFKx5ANGbZ3LAcF0QlTJEVEiSgRJaKopoTx3/hqKP/zfyIxOJSVUbbBPhbS/ksGDsr3ksLZFwtjj+9zd79S9iYyj/5+5bLCvdd7sGZ7r3wf+VTdPvIX0574g4I98QcwTho5HnE21sjf3//FfL92cxV4koqaXIWZXlbMQhh5F/0ckntpOST3zhwSQtbk5sP87ubDrFnTbr6ljJV7/lF70oPPNxX9SXvs5vasfv8reUqdlhZPSmXMxV1yrqB7rkvMH1t3zx/juXAbUhgbHrlwLNKZ7OZWKrB/amszm0nbTf8AMoedu+OHg4oAAAAASUVORK5CYII=" />
              </svg>
             <svg 
                 class="zeroImg activeImg"    
                 viewBox="0 0 145 145"
                 xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink"
                 width="101px" height="101px">
                 <image  x="0px" y="0px" width="101px" height="101px"  xlink:href="data:img/png;base64,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" />

           </svg>
         
             <svg 
                 @touchstart="AtsPushButton('start')" 
                 class="startImg defaultImg"    
                 viewBox="0 0 145 145"
                 xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink"
                 width="101px" height="101px">
                 <image  x="0px" y="0px" width="101px" height="101px"  xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGUAAABlCAMAAABjot39AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABfVBMVEUGBgZmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pmu2pluWlOjVE0XTYhOCISHRMMEQwGBgZeq2EQGBBkt2g4ZTsKDQpYoVsYKBlPkFIMEg0YKRljtmderGIKDgoPGBBOjlEhOSILEAtFfUhfrmNgr2NGfkgTHhNlumk/ckIOFA5HgElgsGQxWDMICghhsWVXnlpLiE4VIhU7aT1erWIsTi4HBwdUmFceMx9Gf0kRGxJjtWY4ZDoLDwtbpl8oRSkGBwZRk1QaLBtBdURhsmUzWjVYoVwkPyZMi08WJBZkuGg+cEAuUTAICQhWnVogNiFIgkoUIBQ6ZzxdqWArTCxSllYbLhxmumo8bD4tTy5WnFlXn1tEfEdYoFtPj1I0XDVNjFAgOCH///9l/esZAAAAJnRSTlMATana8vz+PML6Q9wQwUX2dIuKc0bgP0HH+0+q2/0C4cOOfH3d852qxmYAAAABYktHRH4/uEFzAAAAB3RJTUUH5gYJCx4fq5013gAAAwRJREFUaN7NmvlXEzEQx0Npl3KjgNBLRWHaZQm05SpiQQXvA8WrKN4XKnhfKPzvNsn2oBSs2+Sr80u22/e+n/eyk5kkM4xVWIOv0R+wyKtZAX+jr4Hta03BZs/65dYcbNqT0dKqBaGstaUqo61dI0NYe9tuSEenZghRZ0clpMty/4on7GFnhHu1EWfYTsRdLatrJ+SA+37UHvMMKNmYPerqHSyHdKt3yVRaA0NYOpVUkt1l30RN1/iEJoawiXE1aT1F71IffnJKI4TzqUnlAgVPUy48qWu2irOmMEF3Marp8u5Xe9mImjS1PHvlh5/WDuF8OiOkewXkkASmDEA4T0ntvjylXzzMnDBCSc8I8f48JSQebCMQzm0hHmIsLMPKrCHKrAw2YeYTw0lDEM4TQj7CoiYnzJ2yKPOLIWuMkhXyfhYTg2OM4gj5AJMePWeMMidDpqIYg3Au9f8PijN/6vSZemJcLZQFGSIWz54zSjnv5u8LFy8ZpFwubnuuZM1RyrdXV68hKJRc8pBP/5pCdP3GMoBCdPMWgkJ0+w6CQndzKwAK0b37qwAK0YOHCAotPqpxq1AXhejxk5qCTp0UoqfPEBSi5y8QFHr56k85QQclH3TWXgMoRG/eIihE6xsICiXfrQAoRO8/LAMoRB8/ISj0+csqgEL0FUL5BqFkIJTvEMoawseWAD6GWC+ItQ+JY+sbnJumIPILIldC8j5iD4PYjyH2lpB9MmLPjzi/QM5iiHMl4oyMOO9D7i7M3cNg7pQw92OYuz6+8ANwb1m/wSnG78Yx9/yGaxbDQt4Pqr9ExGC8loSpiyFqfIcL9UrdRWRlpXpln1wxZmqvOandV6wjZ8zVkY+U1cQ3DdTEN6Wy2+MRlD/01/d/St2j0F4F1mPJF2b7Lko9JDltPSS53T0kjA24+V1TP8yvQj/MwM62m2OW+z6+ZW873vPNnLNtbxV7e47/kz6lvKcFNUOCVXquxPIc1MgYrN4/pnrhQloQoX164aSFI9GhmOVZ34oNRSPhStHfw6p6I86XMrIAAAAASUVORK5CYII=" />

              </svg>
             <svg 
                 class="startImg activeImg"    
                 viewBox="0 0 145 145"
                 xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink"
                 width="101px" height="101px">
              <image  x="0px" y="0px" width="101px" height="101px"  xlink:href="data:img/png;base64,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" />
           </svg>
    </div>
 
   
</div>
 
`
export default {
        template,
        name: "geren_skq",

    data(){
        return {
            occupyClient:{createUser:"空闲"},
            clientList:[],
            myClientIndex:0,
            dispValue:0.000,
            skqStatus:"stop",
            skqStatusImg:"https://langjie.oss-cn-hangzhou.aliyuncs.com/space/root/project/shoukongqi/static/stop-1.png",
            zhankaiImg:"zhankai_down.png"
        }
    },
    methods:{
        async AtsPushButton(btnName){
            if (navigator.vibrate) {
                navigator.vibrate(100);
            } else if (navigator.webkitVibrate) {
                navigator.webkitVibrate(100);
            }
            $(".activeImg").hide();
            $(`.${btnName}Img +svg`).show();
            MIO.socketEmitCall(btnName,{connectGroup:"geren_skq"});

        },
        main_contol_wrap_touchend(){
            $(".activeImg").hide();
            $(".defaultImg").show();
        },
        //vtcLog事件
        eventVtcLog(msg){
            //console.log(msg)
            switch (msg.msg){
                case pub_skq_status_enum.move_up:{
                    this.skqStatus=pub_skq_status_enum.move_up;
                    this.skqStatusImg=this.$BASE_IMG_URL("up-1.png");
                    break;
                }
                case pub_skq_status_enum.move_down:{
                    this.skqStatus=pub_skq_status_enum.move_down;
                    this.skqStatusImg=this.$BASE_IMG_URL("down-1.png");
                    break;
                }
                case pub_skq_status_enum.pause:{
                    this.skqStatus=pub_skq_status_enum.pause;
                    this.skqStatusImg=this.$BASE_IMG_URL("stop-1.png");
                    break;
                }
                case pub_skq_status_enum.position:{
                    this.skqStatus=pub_skq_status_enum.position;
                    this.skqStatusImg=this.$BASE_IMG_URL("reset-1.png");
                    break;
                }
            }
        },
        //别人的socket连接,断开事件
       async eventWxClientConnect(msg){
           if(msg.code==-2){
               this.skqStatus=pub_skq_status_enum.offline;
               this.skqStatusImg=this.$BASE_IMG_URL("anniu_huan.png");
               return;
           }
           let r= await MIO.mobileSocketioClientList();
            let  wxclientList=[];
            let machine_clientId="";
            let weXinClientCount=0;
            this.myClientIndex=0;
            if(M.checkR(r)){

                let resClientList=r.data;
                for (let i=0;i<resClientList.length;i++){
                    let client=resClientList[i];

                    if(client.terminalType=="wx"){
                        weXinClientCount++;
                        wxclientList.push(client);
                       // debugger
                        if(weXinClientCount==1){
                            this.occupyClient={createUser:client.createUser};
                        }
                        if(this.$socketIoWebPlugin.clientId==client.clientId){
                            this.myClientIndex=weXinClientCount;
                        }
                    }
                    if(client.terminalType=="action"){
                        machine_clientId=client.clientId;
                    }
                }
                this.clientList=wxclientList;
                if(machine_clientId){
                   //查询状态
                    MIO.socketEmitCall("query_skq_status",{},1,d=>{
                         switch (d){
                             case "INIT": {this.eventVtcLog({msg:pub_skq_status_enum.pause}); break;}
                             case "UP": {this.eventVtcLog({msg:pub_skq_status_enum.move_up}); break;}
                             case "STOP": {this.eventVtcLog({msg:pub_skq_status_enum.pause}); break;}
                             case "DOWN": {this.eventVtcLog({msg:pub_skq_status_enum.move_down}); break;}
                             case "START": {this.eventVtcLog({msg:pub_skq_status_enum.pause}); break;}
                             case "POSITION": {this.eventVtcLog({msg:pub_skq_status_enum.position}); break;}
                         }
                    })
                }else {
                    this.occupyClient={createUser:"中断"};
                }
            }
        },
        socketIoDisConnect(){
            this.clientList=[];
            this.occupyClient={createUser:"中断"};
        },
        showClientList(){
            if( this.zhankaiImg=="zhankai_up.png"){
                this.zhankaiImg="zhankai_down.png";
            }else {
                this.zhankaiImg="zhankai_up.png";
            }
        }

    },
    async mounted() {
        document.title="仿真控制器体验";
        $(".activeImg").hide()
        $(".defaultImg").show()
        M.Component.geren_skq=this;
        if(M.userInfo!=null){
            MIO.socketConnect();
        }
        this.eventWxClientConnect({code:0});
    },
    watch:{

    },
    computed: {
        dispFormatValue(){
            let sign=0;
            if(this.dispValue<0){
                sign=-1;
            }
            let absValue=Math.abs(this.dispValue);
            let absValueStr="";

            absValue=absValue+"";
             let split=  absValue.split(".")
            if(split.length==1){
                split[1]="0";
            }
            absValueStr=split[0].substr(-4,4)+"."+split[1].padEnd(3,0)
            if(sign==-1){
                absValueStr="-"+absValueStr;
            }else {
                absValueStr=absValueStr;
            }
            return  absValueStr;
        }
    }

}


