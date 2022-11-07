import re
from colorama import Fore

processors = []


def readDockBook(fileName):
    book = open(fileName)
    lines = book.readlines()
    processor = ""
    try:
        for line in lines:
            if "Intel Core" in line:
                line = re.sub("\n", "", line)
                line = re.sub("<title>", "", line)
                line = re.sub("</title>", "", line)
                line = re.sub("     ", "", line)
                processor += line
            elif "AMD" in line:
                line = re.sub("\n", "", line)
                line = re.sub("<title>", "", line)
                line = re.sub("</title>", "", line)
                line = re.sub("     ", "", line)
                processor += line
            elif "GHz" in line:
                line = re.sub("\n", "", line)
                line = re.sub("<para>", "", line)
                line = re.sub("</para>", "", line)
                line = re.sub("     ", "", line)
                processor += "@" + line + "@"
            elif "$" in line:
                line = re.sub("\n", "", line)
                line = re.sub("<para>", "", line)
                line = re.sub("</para>", "", line)
                line = re.sub("     ", "", line)
                processor += line
                processors.append(processor)
                processor = ""
    finally:
        book.close()


def listAllProcessors(proc):
    if len(proc) == 0:
        print(Fore.RED + "Sorry, there are no processors available")
    else:
        print(Fore.LIGHTGREEN_EX + "Processors: ")
        for i in range(len(proc)):
            name = proc[i].split("@")[0]
            freq = proc[i].split("@")[1]
            price = proc[i].split("@")[2]
            print(Fore.LIGHTGREEN_EX + (i + 1).__str__() + " -> " + name + " - " + freq + " - " + price)
        print()


def listLowToHighOrReversed(cond):
    result = []
    lowtohigh = []
    for i in range(len(processors)):
        freq = processors[i].split("@")[2].split("$")[0]
        lowtohigh.append(int(freq))
    lowtohigh.sort(reverse=cond)
    for i in range(len(lowtohigh)):
        for j in range(len(processors)):
            if lowtohigh[i].__str__() in processors[j]:
                result.append(processors[j])
    listAllProcessors(result)


def listByModel():
    result = []
    print(Fore.LIGHTGREEN_EX + "Introduce the model you want to find: ")
    print(Fore.LIGHTGREEN_EX + "Examples: ")
    print(Fore.LIGHTGREEN_EX + "i5, i9, I7")
    print(Fore.LIGHTGREEN_EX + "ryzen 5, ryzen 7")
    model = input(Fore.LIGHTMAGENTA_EX + "$> model: ")
    print()
    for i in range(len(processors)):
        if model.lower() in processors[i]:
            result.append(processors[i])
    listAllProcessors(result)


def banner():
    print(Fore.LIGHTMAGENTA_EX +
          " .S_SSSs      sSSs_sSSs      sSSs_sSSs     .S    S.\n"
          ".SS~SSSSS    d%%SP~YS%%b    d%%SP~YS%%b   .SS    SS.\n"
          "S%S   SSSS  d%S'     `S%b  d%S'     `S%b  S%S    S&S\n"
          "S%S    S%S  S%S       S%S  S%S       S%S  S%S    d*S\n"
          "S%S SSSS%P  S&S       S&S  S&S       S&S  S&S   .S*S\n"
          "S&S  SSSY   S&S       S&S  S&S       S&S  S&S_sdSSS\n"
          "S&S    S&S  S&S       S&S  S&S       S&S  S&S~YSSY%b\n"
          "S&S    S&S  S&S       S&S  S&S       S&S  S&S    `S%\n"
          "S*S    S&S  S*b       d*S  S*b       d*S  S*S     S%\n"
          "S*S    S*S  S*S.     .S*S  S*S.     .S*S  S*S     S&\n"
          "S*S SSSSP    SSSbs_sdSSS    SSSbs_sdSSS   S*S     S&\n"
          "S*S  SSY      YSSP~YSSY      YSSP~YSSY    S*S     SS\n"
          "SP                                        SP\n"
          "l                                         Y\n")
    print(Fore.LIGHTMAGENTA_EX + "Coded by Eduardo Blanco Bielsa - @gitblanc\n")


def menu():
    print(Fore.LIGHTMAGENTA_EX + "---------------------------------------")
    print(Fore.LIGHTBLUE_EX + "Select an option: \n")
    print(Fore.LIGHTBLUE_EX + " 1. List all processors")
    print(Fore.LIGHTBLUE_EX + " 2. List processors from low-high price")
    print(Fore.LIGHTBLUE_EX + " 3. List processors from high-low price")
    print(Fore.LIGHTBLUE_EX + " 4. List processors by model\n")
    print(Fore.LIGHTRED_EX + " 0. Exit")
    print(Fore.LIGHTMAGENTA_EX + "---------------------------------------\n")


#  -----------------------------EXECUTION-----------------------------
# Here starts the program
banner()  # shows the banner
readDockBook("dockbook.xml")  # loads the file.xml

while True:
    menu()
    option = int(input(Fore.LIGHTGREEN_EX + "Enter your choice: "))
    if option == 1:
        listAllProcessors(processors)
    elif option == 2:
        listLowToHighOrReversed(False)
    elif option == 3:
        listLowToHighOrReversed(True)
    elif option == 4:
        listByModel()
    elif option == 0:
        exit()
