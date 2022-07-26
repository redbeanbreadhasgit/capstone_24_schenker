import pandas as pd
import warnings
warnings.filterwarnings('ignore')
import re

from nltk.tokenize import word_tokenize
from nltk import pos_tag
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.corpus import wordnet

# import aspose.words as aw
import pickle
import pdftotext

##### Functions for cleaning text, extracting skills #####
# Get raw text from file
def getRawText(filepath):
    with open(filepath, "rb") as f:
        pdf = pdftotext.PDF(f)
    resume_text = ("\n\n".join(pdf))
    return resume_text

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

skills_csv = pd.read_csv('apps/home/skills_df_cleaned.csv')
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
    raw_text = getRawText(filepath)
    text = getCleanText(raw_text)
    tfidf = pickle.load(open("apps/home/tfidfVectorizer.pkl", "rb"))
    X_tfidf = tfidf.transform([text])
    model = pickle.load(open("apps/home/finalisedModel.pkl", "rb"))
    predictions = model.predict_proba(X_tfidf)
    return predictions

# applicant_skills = getSkills("apps/home/Sample Field Support CV 1 (ML - Selected).pdf")
# print(applicant_skills)

# applicant_predictions = getModelPredictions("apps/home/Sample Field Support CV 1 (ML - Selected).pdf")
# print(applicant_predictions[0][3])