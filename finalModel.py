import pandas as pd
import warnings
warnings.filterwarnings('ignore')
import re

from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfpage import PDFPage
from io import StringIO

from nltk.tokenize import word_tokenize
from nltk import pos_tag
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.corpus import wordnet

import pickle
import pdftotext

##### Functions for cleaning text, extracting skills #####
# Get raw text from .pdf
def getRawText(resume_pdf_filepath):
    rsrcmgr = PDFResourceManager()
    retstr = StringIO()
    codec = 'utf-8'
    laparams = LAParams()
    device = TextConverter(rsrcmgr, retstr, codec=codec, laparams=laparams)
    fp = open(resume_pdf_filepath, "rb")
    interpreter = PDFPageInterpreter(rsrcmgr, device)
    password = ""
    maxpages = 0
    caching = True
    pagenos=set()

    for page in PDFPage.get_pages(fp, pagenos, maxpages=maxpages, password=password,caching=caching, check_extractable=True):
        interpreter.process_page(page)

    resume_text = retstr.getvalue()

    fp.close()
    device.close()
    retstr.close()
    return resume_text

# save raw text to .txt
def pdf2Txt(resume_pdf_filepath):
    text = getRawText(resume_pdf_filepath)
    resume_txt_filepath = resume_pdf_filepath.replace(".pdf", ".txt")
    with open(resume_txt_filepath, "w", encoding = 'utf-8') as f:
        f.write("".join(text))
    return resume_txt_filepath

# extract text from .txt
def read_txt(txtFilepath):
    f = open(txtFilepath, encoding = 'ISO-8859-1')
    text = f.readlines()
    return text

# STOPWORD REMOVAL
def stopword(string):
    a = [i for i in string.split() if i not in stopwords.words('english')]
    return ' '.join(a)

#LEMMATIZATION
# Initialize the lemmatizer
wl = WordNetLemmatizer()
 
# This is a helper function to map NTLK position tags
def get_wordnet_pos(tag):
    if tag.startswith('J'):
        return wordnet.ADJ
    elif tag.startswith('V'):
        return wordnet.VERB
    elif tag.startswith('N'):
        return wordnet.NOUN
    elif tag.startswith('R'):
        return wordnet.ADV
    else:
        return wordnet.NOUN
    
# Tokenize the sentence
def lemmatizer(string):
    # Get position tags
    word_pos_tags = pos_tag(word_tokenize(string))
    # Map the position tag and lemmatize the word/token
    a = [wl.lemmatize(tag[0], get_wordnet_pos(tag[1])) for idx, tag in enumerate(word_pos_tags)]
    return ' '.join(a)

# Clean Text Function
def getCleanText(text):
    pat = '[a-zA-Z]+'
    i = 0
    newtext = ''
    for EachLine in text:
        newtext += EachLine.lower()
    # newtext = remove_noneng_nonskill(newtext)
    newtext = stopword(newtext)
    newtext = lemmatizer(newtext)
    # newtext = remove_noneng_nonskill(newtext)
    newtext_lst = re.findall(pat, newtext)
    # print(newtext_lst)
    if len(newtext_lst) <= 20:
        return " ".join(newtext_lst[0:len(newtext_lst)])
    else:
        return " ".join(newtext_lst[9:len(newtext_lst)])

skills_csv = pd.read_csv('/Users/weils/Downloads/Telegram Desktop/Final Model for Integration/skills_df_cleaned.csv')
skill_list = skills_csv['name'].tolist()
skill_list += [
    "itil", "php", "jquery", "javascript" , "bootstrap", "codeigniter", "visual", "c", "powerbuilder", "html", "css",
    ".net", "net", "crystal report", "xml", "soap", "rest", "boomi", "mssql", "mysql", "mariadb", "oracle", "apache", "iis",
    "ubuntu", "linux", "magento", "api", "office", "asp", "sql", "ajax", "joomla", "tradenet", "as400", "programming",
    "vba", "microsoft", "access", "excel", "suite", "six sigma", "project management", "sap", "word", "powerpoint",
    "power point", "visio", "minitab", "flexsim", "certificate", "certified", "certification", "pmp", "ccna",
    "cisa", "cissp", "crisc", "isms", "qlik", "power bi", "azure", "aspnet", "css", "git", "java", "mariadb", "unix", "oracle",
    "sybase"
                  ]

##### Functions to use in Django backend for outputs #####
def getSkills(filepath):
    raw_text = getRawText(filepath)
    text = getCleanText(raw_text)
    skills = []
    for word in skill_list:
        if word in text:
            skills.append(word)
    return list(dict.fromkeys(skills))

def getModelPredictions(filepath):
    txt_filepath = pdf2Txt(filepath)
    raw_text = read_txt(txt_filepath)
    text = getCleanText(raw_text)
    tfidf = pickle.load(open("tfidfVectorizer.pkl", "rb"))
    X_tfidf = tfidf.transform([text])
    model = pickle.load(open("finalisedModel.pkl", "rb"))
    predictions = model.predict_proba(X_tfidf)
    return predictions

def getClasslessPredictions(jdfilepath, resumefilepath):
    resume_filepath_txt = pdf2Txt(resumefilepath)
    resume_raw_text = read_txt(resume_filepath_txt)
    resume_text = getCleanText(resume_raw_text)
    
    jd_raw_text = getRawText(jdfilepath)
    jd_text = getCleanText(jd_raw_text)


    X_predict = [jd_text, resume_text]
    X_predict = pd.DataFrame([X_predict], columns=["JD Text", "Resume Text"])

    classless_model = pickle.load(open('no_class_model.pkl', 'rb'))

    classless_prediction = classless_model.predict(X_predict)
    return classless_prediction


# applicant_skills = getSkills("Sample Field Support CV 1 (ML - Selected).pdf")
# print(applicant_skills)

applicant_predictions = getModelPredictions("Sample Field Support CV 1 (ML - Selected).pdf")
print(applicant_predictions)

classless_predictions = getClasslessPredictions("Job Description - Field Support Engineer.pdf", "Sample Field Support CV 1 (ML - Selected).pdf")
print(classless_predictions[0])

# 0: not suitable for fse
# 1: not suitable for gpis
# 2: not suitable for system analyst
# 3: suitable for fse
# 4: suitable for gpis
# 5: suitable for system analyst

