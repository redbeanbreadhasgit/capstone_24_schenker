from pdfminer.high_level import extract_text
from nltk.corpus import stopwords
import re
import nltk
from .finalModel import *

# nltk.download('stopwords')


def resume_words(input):
    text = getRawText(input)
    text = getCleanText(text)
    return text

def keywords_list(input_keywords):
    kw_list = input_keywords.split(",")
    kw_list = [skill.strip() for skill in kw_list]
    kw_list = [getCleanText(skill) for skill in kw_list]
    return kw_list

def list_to_string(keyword_list):
    sep = ", "
    return sep.join(keyword_list)


def keyword_matching(keywords, resume_filepath):
    resume_text = resume_words(resume_filepath)
    keywords = keywords_list(keywords)
    applicant_keywords = []
    for skill in keywords:
        if skill in resume_text:
            applicant_keywords.append(skill)
    return applicant_keywords
