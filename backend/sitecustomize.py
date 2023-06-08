# install the apport exception handler if available
import sys
from sage.all import *

sys.modules[__name__].__dict__.update(ZZ=ZZ)

try:
    import apport_python_hook
except ImportError:
    pass
else:
    apport_python_hook.install()
