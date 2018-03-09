import java.io.*;
import java.util.ArrayList;
import java.util.List;


/**
 * Created by dionhaneveld on 02/03/2018.
 */

public class ExecuteElectronSolution {

    public static void main(String[] args) throws IOException {

        ExecuteElectronSolution servoy = new ExecuteElectronSolution();
        packageApp(servoy, args[0]);
        installModules(servoy);
        openApp(servoy);

//        if(appExists()) {
//            openApp(servoy);
//        } else {
//            packageApp(servoy, args[0]);
//            installModules(servoy);
//            openApp(servoy);
//        }
    }

    private static boolean appExists(){
        File f = new File("/Applications/Servoy/APP-darwin-x64");
        if (f.exists() && f.isDirectory()) {
            return true;
        } else {
            return false;
        }
    }

    private static void packageApp(ExecuteElectronSolution servoy, String arg) throws IOException {
        List<String> commandPackage = new ArrayList<String>();
        commandPackage.add("/bin/bash");
        commandPackage.add("-c");
        commandPackage.add("servoy " + arg);
        System.out.print("\nPackaging App\n");
        servoy.executeCommand(commandPackage);
    }

    private static void installModules(ExecuteElectronSolution servoy) throws IOException {
        List<String> commandInstallModules = new ArrayList<String>();
        commandInstallModules.add("/bin/bash");
        commandInstallModules.add("-c");
        commandInstallModules.add("cd ./App-darwin-x64/App.app/Contents/Resources/app/; npm install; npm run rebuild");
        System.out.print("\nInstalling Node Modules and Rebuilding against Electron's Node Version\n");
        servoy.executeCommand(commandInstallModules );
    }

    private static void openApp(ExecuteElectronSolution servoy) throws IOException {
        List<String> commandOpen = new ArrayList<String>();
        commandOpen.add("/bin/bash");
        commandOpen.add("-c");
        commandOpen.add("open ./APP-darwin-x64/APP.app");
        System.out.print("\nOpening App");
        servoy.executeCommand(commandOpen);
    }

    private void executeCommand(List<String> command) throws IOException {
        ProcessBuilder builder = new ProcessBuilder(command);
        Process process = builder.start();
        InputStream is = process.getInputStream();
        InputStreamReader isr = new InputStreamReader(is);
        BufferedReader br = new BufferedReader(isr);
        String line;
        while ((line = br.readLine()) != null) {
            System.out.println(line);
        }
    }
}
