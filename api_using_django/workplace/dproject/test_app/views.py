from django.shortcuts import render
from django.http import JsonResponse

def simpleAPI(request):
    learner = [
        {"name":"Ashwani Kushwaha",
         "email":"ashwanikushwaha_cse21@ggct.co.in",
         "mobile":"8269547680"},
         
        {
            "name":"Aditya Sahu",
         "email":"adityasahu_cse21@ggct.co.in",
         "mobile":"7828474045"
        },
        {
            "name":"Aditya Kewat",
            "email":"adityakewat_cse21@ggct.co.in",
            "mobile":"8921763544"
        },
        {
            "name":"Ansh Chourasia",
         "email":"anshchourasia_cse21@ggct.co.in",
         "mobile":"8568623335"
        }
    ]

    return JsonResponse(learner,safe=False)

# Create your views here.
