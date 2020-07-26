# Installing/Upgrading Python Using the Chocolatey Windows Package Manager [^*]

Let's say you have Python 2.7.16:

```shell
C:\Windows\system32>python --version
python2 2.7.16
```

...and you want to upgrade to the (now current) 3.x.y version.  There is a simple way to install a *parallel* installation of Python 3.x.y using a Windows package management tool.

Now that modern Windows has package management, just like Debian Linux distributions have apt-get, and RedHat has dnf: we can put it to work for us!  It's called **Chocolatey**.

## What's Chocolatey?
Chocolatey is a scriptable, command line tool that is based on .NET 4.0 and the nuget package manager baked into Visual Studio.  

If you want to learn about Chocolatey and why to use it, which some here reading this might find particularly useful, go to https://chocolatey.org/docs/why

## Installing Chocolatey

To get the Chocolatey Package Manager, you follow a process that is described at https://chocolatey.org/docs/installation#installing-chocolatey, 

I'll summarize it for you here.  There are basically two options: using the cmd prompt, or using the PowerShell prompt.  

### CMD Prompt Chocolatey Installation

Launch an *administrative* command prompt.  On Windows 10, to do this:

 - <kbd>Windows</kbd>+<kbd>R</kbd>
 - Type *cmd*
 - Press <kbd>ctrl</kbd>+<kbd>shift</kbd>+<kbd>Enter</kbd> 

If you don't have administrator rights on the system, go to the [Chocolatey website][1].  You may not be completely out of luck and can perform a limited local install, but I won't cover that here.

 - Copy the string below into your command prompt and type Enter:

```shell
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```

Chocolatey will be downloaded and installed for you as below:

```shell
Getting latest version of the Chocolatey package for download.
Getting Chocolatey from https://chocolatey.org/api/v2/package/chocolatey/0.10.11.
Downloading 7-Zip commandline tool prior to extraction.
Extracting C:\Users\blahblahblah\AppData\Local\Temp\chocolatey\chocInstall\chocolatey.zip to C:\Users\blahblahblah\AppData\Local\Temp\chocolatey\chocInstall...
Installing chocolatey on this machine
Creating ChocolateyInstall as an environment variable (targeting 'Machine')
  Setting ChocolateyInstall to 'C:\ProgramData\chocolatey'
WARNING: It's very likely you will need to close and reopen your shell
  before you can use choco.
Restricting write permissions to Administrators
We are setting up the Chocolatey package repository.
The packages themselves go to 'C:\ProgramData\chocolatey\lib'
  (i.e. C:\ProgramData\chocolatey\lib\yourPackageName).
A shim file for the command line goes to 'C:\ProgramData\chocolatey\bin'
  and points to an executable in 'C:\ProgramData\chocolatey\lib\yourPackageName'.

Creating Chocolatey folders if they do not already exist.

WARNING: You can safely ignore errors related to missing log files when
  upgrading from a version of Chocolatey less than 0.9.9.
  'Batch file could not be found' is also safe to ignore.
  'The system cannot find the file specified' - also safe.
chocolatey.nupkg file not installed in lib.
 Attempting to locate it from bootstrapper.
PATH environment variable does not have C:\ProgramData\chocolatey\bin in it. Adding...
WARNING: Not setting tab completion: Profile file does not exist at 'C:\Users\blahblahblah\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1'.
Chocolatey (choco.exe) is now ready.
You can call choco from anywhere, command line or powershell by typing choco.
Run choco /? for a list of functions.
You may need to shut down and restart powershell and/or consoles
 first prior to using choco.
Ensuring chocolatey commands are on the path
Ensuring chocolatey.nupkg is in the lib folder
```

Either *Exit* the CMD prompt or type the following command to reload the environment variables:

```shell
refreshenv
``` 


### PowerShell Chocolatey Installation
If you prefer PowerShell to the cmd prompt, you can do this directly from there, however you will have to tell PowerShell to run with a proper script execution policy to get it to work.  On Windows 10, the simplest way I have found to do this is to type the following into the Cortana search bar next to the Windows button:

```
PowerShell.exe
```
Next, right click on the 'Best Match' choice in the menu that pops up and select 'Run as Administrator'

Now that you're in PowerShell, hopefully running with Administrator privileges, execute the following to install Chocolatey:

```shell
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
```

PowerShell will download Chocolatey for you and launch the installation.  It only takes a few moments.  It looks *exactly* like the CMD installation, save perhaps some fancy colored text.

Either *Exit* PowerShell or type the following command to reload the environment variables:

```shell
refreshenv
``` 

## Upgrading Python

The choco command is the same whether you use PowerShell or the cmd prompt.  Launch your favorite using the instructions as above.  I'll use the administrator cmd prompt:

```shell
C:\WINDOWS\system32>choco upgrade python -y
```

Essentially, chocolatey will tell you "Hey, Python isn't installed" since you're coming from 2.7.x and it treats the 2.7 version as *completely* separate. It is *only* going to give you the most current version, 3.x.y (as of this writing, 3.7.2, but that will change in a few months):

```shell
Chocolatey v0.10.11
Upgrading the following packages:
python
By upgrading you accept licenses for the packages.
python is not installed. Installing...

python3 v3.x.y [Approved]
python3 package files upgrade completed. Performing other installation steps.
Installing 64-bit python3...
python3 has been installed.
Installed to: 'C:\Python37' 
  python3 can be automatically uninstalled.
Environment Vars (like PATH) have changed. Close/reopen your shell to
 see the changes (or in powershell/cmd.exe just type `refreshenv`).
 The upgrade of python3 was successful.
  Software installed as 'exe', install location is likely default.

python v3.x.y [Approved]
python package files upgrade completed. Performing other installation steps.
 The upgrade of python was successful.
  Software install location not explicitly set, could be in package or
  default install location if installer.

Chocolatey upgraded 2/2 packages.
 See the log for details (C:\ProgramData\chocolatey\logs\chocolatey.log).
```

*Either* exit out of the cmd/Powershell prompt and re-enter it, or use refreshenv then type py --version

```shell
C:\Windows\System32>refreshenv
Refreshing environment variables from registry for cmd.exe. Please wait...Finished..

C:\Windows\system32>py --version
Python 3.7.2

```
Note that the most recent Python install will now take over when you type Python at the command line.  You can run either version by using the following commands:

```shell
py -2
Python 2.7.16 (v2.7.16:413a49145e, Mar  4 2019, 01:37:19) [MSC v.1500 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> exit()

C:\>py -3
Python 3.7.2 (tags/v3.7.2:9a3ffc0492, Dec 23 2018, 23:09:28) [MSC v.1916 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>>exit()
C:\>
```

From here I suggest you use the Python *pip* utility to install whatever packages you need.  For example, let's say you wanted to install Flask.  The commands below first upgrade pip, then install Flask

```shell
C:\>py -3 -m pip install --upgrade pip
Collecting pip
  Downloading https://files.pythonhosted.org/packages/d8/f3/413bab4ff08e1fc4828dfc59996d721917df8e8583ea85385d51125dceff/pip-19.0.3-py2.py3-none-any.whl (1.4MB)
    100% |████████████████████████████████| 1.4MB 1.6MB/s
Installing collected packages: pip
  Found existing installation: pip 18.1
    Uninstalling pip-18.1:
      Successfully uninstalled pip-18.1
Successfully installed pip-19.0.3
```

Now, with pip and python installed and upgraded, you just need to add your modules through the package manager pip, typing this command:

```shell
py -3 -m pip install <package_name>
```

...will do the trick.  Happy Pythoning!


[1]: https://chocolatey.org/docs/installation#installing-chocolatey

[^*]: This tutorial was adapted from a topic in [stackoverflow](https://stackoverflow.com/questions/45137395/how-do-i-upgrade-the-python-installation-in-windows-10), answered by the user [ggariepy](https://stackoverflow.com/users/2654459/ggariepy).