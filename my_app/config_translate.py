import my_app
import i18n
import os

base_file_path = os.path.dirname(my_app.__file__)
i18n.load_path.append(base_file_path + '/translations')
