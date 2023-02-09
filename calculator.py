#



PRICES = {"covers_price": 1000,
          "slides_new_price": 700,
          "slides_exist_price": 500,
          "clippings_hard_price": 150,
          "clippings_normal_price": 50,
          "adaptations_price": 500,}

COVERS = 1
slides_new = 0
clippings_normal_new = 0
clippings_hard_new = 0
adaptations_new = True
slides_exist = 0
clippings_normal_exist = 0
clippings_hard_exist = 0
adaptations_exist = True
adaptations_other = 0

result = 0

if slides_new > 0:
    result += COVERS * PRICES["covers_price"] + (slides_new - 1) * PRICES["slides_new_price"]
    if adaptations_new:
        result += slides_new * PRICES["adaptations_price"]
    if clippings_normal_new > 0:
        result += clippings_normal_new * PRICES["clippings_normal_price"]
    if clippings_hard_new > 0:
        result += clippings_hard_new * PRICES["clippings_hard_price"]
if slides_exist > 0:
    result += slides_exist * PRICES["slides_exist_price"]
    if adaptations_exist:
        result += slides_exist * PRICES["adaptations_price"]
    if clippings_normal_exist > 0:
        result += clippings_normal_exist * PRICES["clippings_normal_price"]
    if clippings_hard_exist > 0:
        result += clippings_hard_exist * PRICES["clippings_hard_price"]
if adaptations_other > 0:
    result += adaptations_other * PRICES["adaptations_price"]


print(f"result = {result}")


