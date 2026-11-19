#!/bin/bash

function help() {
    echo "$0 "
    echo "=======================================================================";
    echo "This script checks on linux for the correct ulimits that Cognos11 needs";
    echo "V 0.1 - AMVARA CONSULTING, Ralf Roeber"
    echo "=======================================================================";
}


help;

#
# see installation documentation for details https://www.ibm.com/support/pages/how-install-cognos-analytics-11x-rhel
#

# record failures for later overall hints
hasfailed=false

printf "CPU time (seconds): unlimited "
RES=$(ulimit -t)
if [ "${RES}" == "unlimited" ]; then echo "...[ok]"; else echo "...[failed] ... value is: ${RES}"; $hasfailed=true; fi

printf "File size (blocks): unlimited";
RES=$(ulimit -f);
if [ "${RES}" == "unlimited" ]; then echo "...[ok]"; else echo "...[failed] ... value is: ${RES}"; $hasfailed=true;fi

printf "Maximum memory size (kbytes): unlimited";
RES=$(ulimit -m)
if [ "${RES}" == "unlimited" ]; then echo "...[ok]"; else echo "...[failed] ... value is: ${RES}"; $hasfailed=true;fi

printf "Maximum user processes: unlimited";
RES=$(ulimit -u)
if [ "${RES}" == "unlimited" ]; then echo "...[ok]"; else echo "...[failed] ... value is: ${RES}"; $hasfailed=true;fi

printf "Open files: 8192 (minimum value)";
RES=$(ulimit -n)
if [ ${RES} -gt 8192 ]; then echo "...[ok]"; else echo "...[failed] ... value is: ${RES}"; $hasfailed=true;fi

printf "Stack size (kbytes): unlimited";
RES=$(ulimit -s)
if [ "${RES}" == "unlimited" ]; then echo "...[ok]"; else echo "...[failed] ... value is: ${RES}"; $hasfailed=true;fi

printf "Virtual memory (kbytes): unlimited";
RES=$(ulimit -v)
if [ "${RES}" == "unlimited" ]; then echo "...[ok]"; else echo "...[failed] ... value is: ${RES}"; $hasfailed=true;fi

#
# general help on failure of any settings
#
if [ "${hasfailed}" == "true" ]; then 
cat <<eof
    You could set certain limits userspecific in .profile
    FILEHANDLE=`ulimit -n`
    if [ $FILEHANDLE != "unlimited" ]; then
            if [ $FILEHANDLE -lt "65536" ]; then
                    ulimit -n 65536
            fi
    fi
    STACKSIZE=`ulimit -s`
    if [ $STACKSIZE != "unlimited" ]; then
            if [ "${STACKSIZE}" -lt "8192000" ]; then
            ulimit -s unlimited
            fi
    fi
eof
fi